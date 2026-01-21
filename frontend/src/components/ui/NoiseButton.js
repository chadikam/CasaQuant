import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const NoiseButton = ({
  children,
  onClick,
  className = "",
  gradientColors = ["#3ecfcf", "#34d399", "#5ee0e0"],
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = 200;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    // Create noise pattern
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 25; // Low opacity for subtle effect
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(135deg, ${gradientColors.join(", ")})`,
  };

  return (
    <motion.div
      className={`noise-button-wrapper ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        display: "inline-flex",
        padding: "3px",
        borderRadius: "9999px",
        ...gradientStyle,
      }}
    >
      {/* Noise overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          opacity: 0.3,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          inset: "-2px",
          borderRadius: "9999px",
          ...gradientStyle,
          filter: "blur(12px)",
          opacity: 0.5,
          zIndex: -1,
        }}
      />

      {/* Button */}
      <button
        onClick={onClick}
        style={{
          position: "relative",
          padding: "14px 28px",
          fontSize: "0.9375rem",
          fontWeight: 550,
          color: "var(--bg-primary)",
          background: "linear-gradient(180deg, #0f1012 0%, #0a0a0b 100%)",
          border: "none",
          borderRadius: "9999px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <span style={{ 
          background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {children}
        </span>
      </button>
    </motion.div>
  );
};

export default NoiseButton;
