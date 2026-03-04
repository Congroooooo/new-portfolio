import React from 'react';

const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;

interface DotGridProps {
  className?: string;
  width?: number;
  height?: number;
}

export function DotGrid({
  className = '',
  width = GRID_WIDTH,
  height = GRID_HEIGHT,
}: DotGridProps) {
  const dots: React.ReactElement[] = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      dots.push(
        <div
          className="flex items-center justify-center rounded-full"
          key={`${i}-${j}`}
        >
          <div
            className="h-1.5 w-1.5 rounded-full opacity-30 shadow-[0_0_4px_rgba(255,255,255,0.2)]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)',
            }}
          />
        </div>
      );
    }
  }

  return (
    <div
      className={`pointer-events-none absolute top-0 left-0 z-[1] box-border grid h-full w-full gap-2 p-5 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
      }}
    >
      {dots}
    </div>
  );
}
