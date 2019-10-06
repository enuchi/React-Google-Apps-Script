// Google Apps Script methods available to scripts
declare namespace google {
  /**
   * Methods available to Google Apps Script
   */
  namespace script {
    interface IRun {
      [serverSideFunction: string]: Function;

      /**
       * Sets a callback function to run if the server-side function throws an exception. Without a failure handler, failures are logged to the JavaScript console. To override this, call withFailureHandler(null) or supply a failure handler that does nothing.
       * @param callback a client-side callback function to run if the server-side function throws an exception; the Error object is passed to the function as the first argument, and the user object (if any) is passed as a second argument
       */
      withFailureHandler(callback: (error: Error, object?: any) => void): IRun;
      /**
       * Sets a callback function to run if the server-side function returns successfully.
       * @param callback a client-side callback function to run if the server-side function returns successfully; the server's return value is passed to the function as the first argument, and the user object (if any) is passed as a second argument
       */
      withSuccessHandler(callback: (value: any, object?: any) => void): IRun;
      /**
       * Sets an object to pass as a second parameter to the success and failure handlers.
       * @param {Object} object an object to pass as a second parameter to the success and failure handlers; because user objects are not sent to the server, they are not subject to the restrictions on parameters and return values for server calls. User objects cannot, however, be objects constructed with the new operator
       */
      withUserObject(object: Object): IRun;
    }

    interface IUrlLocation {
      /**
       * The string value of URL fragment after the # character, or an emptry string if no URL fragment is present
       */
      hash: string;
      /**
       * An object of key/value pairs that correspond to the URL request parameters. Only the first value will be returned for parameters that have multiple values. If no parameters are present, this will be an empty object.
       */
      parameter: { [key: string]: any };
      /**
       * An object similar to location.parameter, but with an array of values for each key. If no parameters are present, this will be an empty object.
       */
      parameters: { [key: string]: any[] };
    }

    /**
     * google.script.run is an asynchronous client-side JavaScript API available in HTML-service pages that can call server-side Apps Script functions.
     */
    const run: IRun;

    /**
     * google.script.history is an asynchronous client-side JavaScript API that can interact with the browser history stack. It can only be used in the context of a web app that uses IFRAME.
     */
    namespace history {
      /**
       * Pushes the provided state object, URL parameters and URL fragment onto the browser history stack.
       * @param stateObject An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped. Typically used to store application state information (such as page data) for future retrieval.
       * @param params An object containing URL parameters to associate with this state. For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz". Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz". If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
       * @param hash The string URL fragment appearing after the '#' character. If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
       */
      function push(
        stateObject?: any,
        params?: { [key: string]: any },
        hash?: string
      ): void;
      /**
       * Replaces the top event on the browser history stack with the provided (developer-defined) state object, URL parameters and URL fragment. This is otherwise identical to push().
       * @param stateObject An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped. Typically used to store application state information (such as page data) for future retrieval.
       * @param params An object containing URL parameters to associate with this state. For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz". Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz". If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
       * @param hash The string URL fragment appearing after the '#' character. If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
       */
      function replace(
        stateObject?: any,
        params?: { [key: string]: any },
        hash?: string
      ): void;
      /**
       * Sets a callback function to respond to changes in the browser history. The callback function should take only a single event object as an argument.
       * @param callback a client-side callback function to run upon a history change event, using the event object as the only argument.
       */
      function setChangeHandler(
        callback: (event: { state: any; location: IUrlLocation }) => void
      ): void;
    }

    namespace host {
      /**
       * Closes the current dialog or sidebar.
       */
      function close(): void;
      /**
       * Sets the height of the current dialog.
       * @param {number} height the new height, in pixels
       */
      function setHeight(height: number): void;
      /**
       * Sets the width of the current dialog.
       * @param {number} width the new width, in pixels
       */
      function setWidth(width: number): void;
      namespace editor {
        /**
         * Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor.
         */
        function focus(): void;
      }
    }
    /**
     * google.script.url is an asynchronous client-side JavaScript API that can query URLs to obtain the current URL parameters and fragment. This API supports the google.script.history API. It can only be used in the context of a web app that uses IFRAME.
     */
    namespace url {
      /**
       * Gets a URL location object and passes it to the specified callback function (as the only argument).
       * @param callback a client-side callback function to run, using the location object as the only argument.
       */
      function getLocation(callback: (location: IUrlLocation) => void): void;
    }
  }
}
