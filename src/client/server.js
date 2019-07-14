/*
Convert google script server calls to more
familiar js/promise-based functions.
*/

const serverMethods = {};

// skip the reserved methods
const ignoredMethods = [
  'withFailureHandler',
  'withLogger',
  'withSuccessHandler',
  'withUserObject',
];

for (const method in google.script.run) {
  if (!ignoredMethods.includes(method)) {
    serverMethods[method] = (...args) => {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)[method](...args);
      });
    };
  }
}


export default serverMethods;
