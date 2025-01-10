"use client"
import { useRef, useState, useEffect } from 'react';

interface UseInfiniteScrollProps<T> {
  items: T[];
  speed?: number;  // px per frame or per “tick”
  itemWidth: number; // width in pixels of each item (including margin)
}

export function useInfiniteScroll<T>({ items, speed = 1, itemWidth }: UseInfiniteScrollProps<T>) {
  const [displayItems, setDisplayItems] = useState<T[]>(items);
  const [translateX, setTranslateX] = useState(0);

  const rafId = useRef<number | null>(null);

  // Animate
  useEffect(() => {
    function tick() {
      setTranslateX(prev => {
        const next = prev - speed;
        // If the first item has scrolled out of view:
        if (Math.abs(next) >= itemWidth) {
          // Move the first item to the end
          setDisplayItems(prevItems => {
            const [first, ...rest] = prevItems;
            return [...rest, first];
          });
          // Adjust offset by +itemWidth to “cancel out” that shift
          return next + itemWidth;
        }
        return next;
      });
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [speed, itemWidth]);

  return { displayItems, translateX };
}