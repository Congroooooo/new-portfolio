import React from "react";
import "./DotGrid.css";

const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;

const DotGrid = ({ className = "" }) => {
  const dots = [];

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div className="dot-container" key={`${i}-${j}`}>
          <div className="dot-point" />
        </div>
      );
    }
  }

  return (
    <div
      className={`dot-grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
      }}
    >
      {dots}
    </div>
  );
};

export default DotGrid;
