import { useRef, useLayoutEffect, useCallback } from 'react';

const isBrowser = typeof window !== `undefined`;

export const vh = document.documentElement.clientHeight;
export const vw = document.documentElement.clientWidth;

interface ScrollPosition {
  element?: any;
  useWindow: boolean;
}

function getScrollPosition({ element, useWindow }: ScrollPosition) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow ? { x: window.scrollX, y: window.scrollY } : { x: position.left, y: position.top };
}

export function useScrollPosition(effect: any, element?: React.RefObject<HTMLElement>, useWindow: boolean = true) {
  const position = useRef(getScrollPosition({ useWindow }));

  const callBack = useCallback(() => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
  }, [effect, element, useWindow]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', callBack);
    return () => window.removeEventListener('scroll', callBack);
  }, [callBack])
}