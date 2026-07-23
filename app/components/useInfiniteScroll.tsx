"use client"
import { useRef, useState, useEffect } from 'react';

interface UseInfiniteScrollProps<T> {
  items: T[];
  speed?: number;  // px per frame or per “tick”
  itemWidth: number; // width in pixels of each item (including margin)
}

export function useInfiniteScroll<T>({ items, speed = 1, itemWidth }: UseInfiniteScrollProps<T>) {
  // Create a duplicated array of items to ensure smooth looping
  const duplicatedItems = [...items, ...items];
  const [displayItems, setDisplayItems] = useState<T[]>(duplicatedItems);
  const [translateX, setTranslateX] = useState(0);

  const rafId = useRef<number | null>(null);

  // Reset when original items change
  useEffect(() => {
    setDisplayItems([...items, ...items]);
  }, [items]);

  // Animate
  useEffect(() => {
    function tick() {
      setTranslateX(prev => {
        const next = prev - speed;
        // If we've scrolled past half of the items (original set)
        if (Math.abs(next) >= (items.length * itemWidth)) {
          // Reset position to start
          return 0;
        }
        return next;
      });
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [speed, itemWidth, items.length]);

  return { displayItems, translateX };
}