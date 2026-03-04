import { useState, useEffect } from 'react';

export function useRotatingIndex(
  length: number,
  interval: number = 3000
): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return index % length;
}
