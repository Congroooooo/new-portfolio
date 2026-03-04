import { useState, useEffect } from 'react';

/**
 * Custom hook for continuous forward rotation without reversing.
 * Tracks accumulated rotation to prevent backwards animation when looping.
 *
 * @param length - Number of items to rotate through
 * @param interval - Rotation interval in milliseconds
 * @returns Object with current index and accumulated rotation in degrees
 */
export function useContinuousRotation(
  length: number,
  interval: number = 3000
): { index: number; rotation: number } {
  const [counter, setCounter] = useState(0);
  const anglePerItem = 360 / length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return {
    index: counter % length,
    rotation: counter * anglePerItem,
  };
}
