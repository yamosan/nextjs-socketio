import { RefObject, useCallback, useEffect, useState } from "react";

export const useScrollBottom = (containerRef: RefObject<HTMLElement>) => {
  const [isBottom, setIsBottom] = useState(false);
  const scrollBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [containerRef]);

  useEffect(() => {
    if (containerRef.current) {
      const onScroll = () => {
        if (containerRef.current.scrollHeight - containerRef.current.clientHeight === containerRef.current.scrollTop) {
          setIsBottom(true);
        }
      };
      onScroll();
      // debounce
      let timeoutId: ReturnType<typeof setTimeout>;
      const onScrollDebounce = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(onScroll, 200);
      };
      containerRef.current?.addEventListener("scroll", onScrollDebounce);

      return () => {
        containerRef.current?.removeEventListener("scroll", onScrollDebounce);
      };
    }
  }, [containerRef]);

  return { isBottom, scrollBottom };
};
