import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
};

const useMobile = () => {
  return useMediaQuery("(max-width: 767px)");
};

const useTablet = () => {
  // return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  return useMediaQuery("(min-width: 768px) and (max-width: 990px)");
};

const useDesktop = () => {
  return useMediaQuery("(min-width: 1024px)");
};

export { useMobile, useTablet, useDesktop };
