import {useEffect} from "react";

export function useKey(key, action) {
useEffect(
  function () {
    function callback(event) {
      if (event.code.toLowercase() === key.toLowercase()) {
        action();
      }
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  },
  [action, key]
);
    
}

