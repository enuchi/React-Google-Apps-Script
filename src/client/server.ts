/*
Convert google script server calls to more
familiar js/promise-based functions.
*/
interface ServerMethods {
  [method: string]: Function;
}

const serverMethods: ServerMethods = {};

// skip the reserved methods
const ignoredMethods = [
  'withFailureHandler',
  'withLogger',
  'withSuccessHandler',
  'withUserObject',
];

for (const method in google.script.run) {
  if (!ignoredMethods.includes(method)) {
    // tslint:disable-next-line: no-any
    serverMethods[method] = (...args: any[]) => {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)
          [method](...args);
      });
    };
  }
}

export { serverMethods };
