import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export const BackgroundRippleEffect = ({
  gridSize = 20,
  className = "",
}) => {
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
        const isHovered = hoveredCell === index;

        return (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredCell(index)}
            onMouseLeave={() => setHoveredCell(null)}
            animate={{
              backgroundColor: isHovered
                ? "rgba(62, 207, 207, 0.15)"
                : "rgba(255, 255, 255, 0.02)",
              scale: 1,
            }}
            transition={{
              duration: 0.15,
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
