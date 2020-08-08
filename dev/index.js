import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import server from '../src/client/utils/server';

const { serverFunctions } = server;

const { FILENAME, PORT } = process.env;

const DevServer = () => {
  const iframe = React.useRef(null);
  useEffect(() => {
    const handleRequest = event => {
      const request = event.data;
      const { type, functionName, id, args } = request;

      if (type !== 'REQUEST') return;

      serverFunctions[functionName](...args)
        .then(response => {
          iframe.current.contentWindow.postMessage(
            { type: 'RESPONSE', id, status: 'SUCCESS', response },
            `https://localhost:${PORT}`
          );
        })
        .catch(err => {
          iframe.current.contentWindow.postMessage(
            {
              type: 'RESPONSE',
              id,
              status: 'ERROR',
              response: err,
            },
            `https://localhost:${PORT}`
          );
        });
    };

    window.addEventListener('message', handleRequest, false);
  }, []);

  return (
    <div
      // we want our dev environment to fill the dialog window
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <iframe
        style={{
          width: '100%',
          height: '100%',
          border: '0',
          position: 'absolute',
        }}
        ref={iframe}
        // The "/gas/" path here must match the path where the custom dev server is being loaded.
        // See webpack.config.js "devServer" "before" settings.
        // Filename extension "-impl" must match webpack.config.js clientConfigs filename settings for development.
        src={`https://localhost:${PORT}/gas/${FILENAME}-impl.html`}
      />
    </div>
  );
};

ReactDOM.render(<DevServer />, document.getElementById('index'));
