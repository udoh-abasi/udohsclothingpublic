import { useEffect, useState } from "react";

export const useMatchMedia = (mediaQuery) => {
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const watcher = window.matchMedia(mediaQuery);
    setIsMatching(watcher.matches);

    const listener = (matches) => {
      setIsMatching(matches.matches);
    };

    watcher.addEventListener("change", listener);

    return () => {
      return watcher.removeEventListener("change", listener);
    };
  }, [mediaQuery]);

  return isMatching;
};
