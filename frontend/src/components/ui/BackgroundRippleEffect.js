import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

export const BackgroundRippleEffect = ({
  gridSize = 20,
  className = "",
}) => {
  const [clickedCells, setClickedCells] = useState(new Set());
  const [hoveredCell, setHoveredCell] = useState(null);

  const columns = gridSize;
  const rows = Math.ceil(gridSize * 0.6);

  const cells = useMemo(() => {
    const cellArray = [];
    for (let i = 0; i < rows * columns; i++) {
      cellArray.push(i);
    }
    return cellArray;
  }, [rows, columns]);

  const getNeighbors = useCallback((index, distance = 1) => {
    const neighbors = [];
    const row = Math.floor(index / columns);
    const col = index % columns;

    for (let dr = -distance; dr <= distance; dr++) {
      for (let dc = -distance; dc <= distance; dc++) {
        if (dr === 0 && dc === 0) continue;
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns) {
          const dist = Math.abs(dr) + Math.abs(dc);
          neighbors.push({ index: newRow * columns + newCol, distance: dist });
        }
      }
    }
    return neighbors;
  }, [columns, rows]);

  return (
    <div
      className={`background-ripple ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1px",
        opacity: 0.4,
        pointerEvents: "auto",
      }}
    >
      {cells.map((index) => {
        const isClicked = clickedCells.has(index);
        const isHovered = hoveredCell === index;

        return (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredCell(index)}
            onMouseLeave={() => setHoveredCell(null)}
            animate={{
              backgroundColor: isClicked
                ? "rgba(62, 207, 207, 0.4)"
                : isHovered
                ? "rgba(62, 207, 207, 0.15)"
                : "rgba(255, 255, 255, 0.02)",
              scale: isClicked ? 1.1 : 1,
            }}
            transition={{
              duration: isClicked ? 0.3 : 0.15,
              ease: "easeOut",
            }}
            style={{
              aspectRatio: "1",
              borderRadius: "4px",
              cursor: "default",
              border: "1px solid rgba(255, 255, 255, 0.03)",
            }}
          />
        );
      })}
    </div>
  );
};

export default BackgroundRippleEffect;
