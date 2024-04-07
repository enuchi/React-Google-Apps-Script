import { resolve } from 'path';
import { build, defineConfig } from 'vite';
import { readFileSync } from 'fs';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { writeFile } from 'fs/promises';

const PORT = 3000;
const clientRoot = './src/client';
const outDir = './dist';

const clientEntrypoints = [
  {
    name: 'CLIENT - Dialog Demo',
    // entry: './src/client/dialog-demo/index.jsx',
    filename: 'dialog-demo',
    template: 'dialog-demo/index.html', // only use part after root
  },
  {
    name: 'CLIENT - Sidebar About Page',
    // entry: './src/client/sidebar-about-page/index.js',
    filename: 'sidebar-about-page',
    template: 'sidebar-about-page/index.html',
  },
];

const clientServeConfig = () =>
  defineConfig({
    plugins: [react()],
    server: {
      port: PORT,
      https: {
        key: readFileSync(resolve(__dirname, './certs/key.pem')),
        cert: readFileSync(resolve(__dirname, './certs/cert.pem')),
      },
    },
    root: clientRoot,
  });

const clientBuildConfig = ({ clientEntrypointRoot, template }) =>
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
        // add externals for react and react-dom
        external: ['react', 'react-dom'],
        output: {
          format: 'iife', // needed to use globals from UMD builds
          dir: outDir,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
        input: resolve(__dirname, clientRoot, template),
      },
    },
  });

const serverConfig = ({
  mode,
  emptyOutDir = true,
}: {
  mode: string;
  emptyOutDir?: boolean;
}) => {
  const targets = [{ src: 'appsscript.json', dest: './' }];

  if (mode === 'development') {
    targets.push(
      ...clientEntrypoints.map((entrypoint) => ({
        src: 'dev/dev-server-wrapper.html',
        dest: './',
        rename: entrypoint.filename + '.html',
        transform: (contents, filename) =>
          contents
            .toString()
            .replace('__PORT__', String(PORT))
            .replace('__FILE_NAME__', entrypoint.template),
      }))
    );
  }
  return defineConfig({
    plugins: [
      viteStaticCopy({
        targets,
      }),
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

          console.log('Finished building client bundles!'); // run during closeBundle hook. https://rollupjs.org/guide/en/#closebundle
        },
      },
    ].filter(Boolean),
    build: {
      emptyOutDir,
      minify: false, // needed to work with footer
      lib: {
        entry: resolve(__dirname, 'src/server/index.ts'),
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
    },
  });
};

// https://vitejs.dev/config/
export default async ({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    // for 'serve' mode, we only want to serve the client bundle locally
    return clientServeConfig();
  }
  if (command === 'build') {
    // for 'build' mode, we have two paths: build assets for local development, and build for production

    if (mode === 'development') {
      // when building for development, we want to build the "dev" wrapper for each client entrypoint
      console.log('buildling client dev config');
      return serverConfig({ mode, emptyOutDir: true });
    }
    if (mode === 'production') {
      // When building for production, we want to build the server code and client code.
      // For the client code, we want to build separate single-page html files for each entrypoint.
      return serverConfig({ mode, emptyOutDir: true });
    }
    return serverConfig({ mode });
  }
};
