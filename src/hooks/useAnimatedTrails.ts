import { useState, useEffect, useCallback } from 'react';

export interface AnimatedTrail {
  id: number;
  left: number;
  duration: number;
}

export function useAnimatedTrails(options?: {
  gridSize?: number;
  duration?: number;
  minDelay?: number;
  maxDelay?: number;
}) {
  const {
    gridSize = 50,
    duration = 3.5,
    minDelay = 1000,
    maxDelay = 5000,
  } = options || {};

  const [activeTrails, setActiveTrails] = useState<AnimatedTrail[]>([]);

  const createRandomTrail = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const numberOfGridLines = Math.floor(viewportWidth / gridSize) + 1;
    const randomGridLine = Math.floor(Math.random() * numberOfGridLines);
    const gridLinePosition = randomGridLine * gridSize;
    const leftPercentage = (gridLinePosition / viewportWidth) * 100;

    const newTrail: AnimatedTrail = {
      id: Date.now() + Math.random(),
      left: leftPercentage,
      duration,
    };

    setActiveTrails((prev) => [...prev, newTrail]);

    setTimeout(() => {
      setActiveTrails((prev) =>
        prev.filter((trail) => trail.id !== newTrail.id)
      );
    }, duration * 1000);
  }, [gridSize, duration]);

  useEffect(() => {
    const scheduleNextTrail = () => {
      const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
      setTimeout(() => {
        createRandomTrail();
        scheduleNextTrail();
      }, randomDelay);
    };

    scheduleNextTrail();

    createRandomTrail();
  }, [createRandomTrail, minDelay, maxDelay]);

  return activeTrails;
}
