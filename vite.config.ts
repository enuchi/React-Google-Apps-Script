import { resolve } from 'path';
import { BuildOptions, ServerOptions, build, defineConfig } from 'vite';
import { existsSync, readFileSync } from 'fs';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { writeFile } from 'fs/promises';

const PORT = 3000;
const clientRoot = './src/client';
const outDir = './dist';
const serverEntry = 'src/server/index.ts';
const copyAppscriptEntry = './appsscript.json';
const devServerWrapper = './dev/dev-server-wrapper.html';

const clientEntrypoints = [
  {
    name: 'CLIENT - Dialog Demo',
    filename: 'dialog-demo', // we'll add the .html suffix to these
    template: 'dialog-demo/index.html',
  },
  {
    name: 'CLIENT - Dialog Demo Bootstrap',
    filename: 'dialog-demo-bootstrap',
    template: 'dialog-demo-bootstrap/index.html',
  },
  {
    name: 'CLIENT - Dialog Demo MUI',
    filename: 'dialog-demo-mui',
    template: 'dialog-demo-mui/index.html',
  },
  {
    name: 'CLIENT - Dialog Demo Tailwind CSS',
    filename: 'dialog-demo-tailwindcss',
    template: 'dialog-demo-tailwindcss/index.html',
  },
  {
    name: 'CLIENT - Sidebar About Page',
    filename: 'sidebar-about-page',
    template: 'sidebar-about-page/index.html',
  },
];

const keyPath = resolve(__dirname, './certs/key.pem');
const certPath = resolve(__dirname, './certs/cert.pem');
const pfxPath = resolve(__dirname, './certs/cert.pfx'); // if needed for Windows

const devServerOptions: ServerOptions = {
  port: PORT,
};

// use key and cert settings only if they are found
if (existsSync(keyPath) && existsSync(certPath)) {
  devServerOptions.https = {
    key: readFileSync(resolve(__dirname, './certs/key.pem')),
    cert: readFileSync(resolve(__dirname, './certs/cert.pem')),
  };
}

// If mkcert -install cannot be used on Windows machines (in pipeline, for example), the
// script at scripts/generate-cert.ps1 can be used to create a .pfx cert
if (existsSync(pfxPath)) {
  // use pfx file if it's found
  devServerOptions.https = {
    pfx: readFileSync(pfxPath),
    passphrase: 'abc123',
  };
}

const clientServeConfig = () =>
  defineConfig({
    plugins: [react()],
    server: devServerOptions,
    root: clientRoot,
  });

const clientBuildConfig = ({
  clientEntrypointRoot,
  template,
}: {
  clientEntrypointRoot: string;
  template: string;
}) =>
  defineConfig({
    plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: true })],
    root: resolve(__dirname, clientRoot, clientEntrypointRoot),
    build: {
      sourcemap: false,
      write: false, // don't write to disk
      outDir,
      emptyOutDir: true,
      minify: true,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-transition-group',
          'react-bootstrap',
          '@mui/material',
          '@emotion/react',
          '@emotion/styled',
          'gas-client',
          '@types/react',
        ],
        output: {
          format: 'iife', // needed to use globals from UMD builds
          dir: outDir,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-transition-group': 'ReactTransitionGroup',
            'react-bootstrap': 'ReactBootstrap',
            '@mui/material': 'MaterialUI',
            '@emotion/react': 'emotionReact',
            '@emotion/styled': 'emotionStyled',
            'gas-client': 'GASClient',
            '@types/react': '@types/react',
          },
        },
        input: resolve(__dirname, clientRoot, template),
      },
    },
  });

const serverBuildConfig: BuildOptions = {
  emptyOutDir: true,
  minify: false, // needed to work with footer
  lib: {
    entry: resolve(__dirname, serverEntry),
    fileName: 'code',
    name: 'globalThis',
    formats: ['iife'],
  },
  rollupOptions: {
    output: {
      entryFileNames: 'code.js',
      extend: true,
      footer: (chunk) =>
        chunk.exports
          .map((exportedFunction) => `function ${exportedFunction}() {};`)
          .join('\n'),
    },
  },
};

const buildConfig = ({ mode }: { mode: string }) => {
  const targets = [{ src: copyAppscriptEntry, dest: './' }];
  if (mode === 'development') {
    targets.push(
      ...clientEntrypoints.map((entrypoint) => ({
        src: devServerWrapper,
        dest: './',
        rename: entrypoint.filename + '.html',
        transform: (contents: string) =>
          contents
            .toString()
            .replace(/__PORT__/g, String(PORT))
            .replace(/__FILE_NAME__/g, entrypoint.template),
      }))
    );
  }
  return defineConfig({
    plugins: [
      viteStaticCopy({
        targets,
      }),
      /**
       * This builds the client react app bundles for production, and writes them to disk.
       * Because multiple client entrypoints (dialogs) are built, we need to loop through
       * each entrypoint and build the client bundle for each. Vite doesn't have great tooling for
       * building multiple single-page apps in one project, so we have to do this manually with a
       * post-build closeBundle hook (https://rollupjs.org/guide/en/#closebundle).
       */
      mode === 'production' && {
        name: 'build-client-production-bundles',
        closeBundle: async () => {
          console.log('Building client production bundles...');
          for (const clientEntrypoint of clientEntrypoints) {
            console.log('Building client bundle for', clientEntrypoint.name);
            const buildOutput = await build(
              clientBuildConfig({
                clientEntrypointRoot: clientEntrypoint.filename,
                template: clientEntrypoint.template,
              })
            );
            await writeFile(
              resolve(__dirname, outDir, clientEntrypoint.filename + '.html'),
              // @ts-expect-error - output is an array of RollupOutput
              buildOutput.output[0].source
            );
          }
          console.log('Finished building client bundles!');
        },
      },
    ].filter(Boolean),
    build: serverBuildConfig,
  });
};

// https://vitejs.dev/config/
export default async ({ command, mode }: { command: string; mode: string }) => {
  if (command === 'serve') {
    // for 'serve' mode, we only want to serve the client bundle locally
    return clientServeConfig();
  }
  if (command === 'build') {
    // for 'build' mode, we have two paths: build assets for local development, and build for production
    return buildConfig({ mode });
  }
};
