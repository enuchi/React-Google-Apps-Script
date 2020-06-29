// Convert google script server calls to more familiar promise-based functions

const myServerFunctions = {};

// identify the reserved functions
const ignoredMethods = new Set([
  'withFailureHandler',
  'withLogger',
  'withSuccessHandler',
  'withUserObject',
]);

// get all the public/global function names from the server
const serverFunctionNames = Object.keys(google.script.run);

// filter out the reserved names
const myServerFunctionNames = serverFunctionNames.filter(
  serverFunction => !ignoredMethods.has(serverFunction)
);

// save each function to our new server object using promises
myServerFunctionNames.forEach(serverFunctionName => {
  myServerFunctions[serverFunctionName] = (...args) =>
    new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [serverFunctionName](...args);
    });
});

export default myServerFunctions;
