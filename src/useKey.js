import { useEffect } from "react";

export function useKey(key, action) {
  //Listening to keypress
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      //cleanup function
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
