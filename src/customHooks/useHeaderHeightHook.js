import { useEffect, useState } from "react";

export const useHeaderHeightHook = () => {
  const [theHeaderHeight, setTheHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header"); // So, if this 'document.querySelector' is not in a useEffect, there will be an error

    const listener = () => {
      setTheHeaderHeight(header.clientHeight);
    };

    listener();

    window.addEventListener("resize", listener); // Also, if you do NOT put this in a useEffect, there will be an error. This is bcoz of the server side rendering of next, and useEffect on renders on client side

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [theHeaderHeight]);

  return theHeaderHeight;
};
