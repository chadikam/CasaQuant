import React from "react";
import { motion } from "framer-motion";

export const BentoGrid = ({ children, className = "" }) => {
  return (
    <div
      className={`bento-grid ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "var(--space-4)",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  title,
  description,
  header,
  icon,
  className = "",
  colSpan = 1,
}) => {
  return (
    <motion.div
      className={`bento-item ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      style={{
        gridColumn: `span ${colSpan}`,
        padding: "var(--space-5)",
        background: "linear-gradient(180deg, var(--surface-2) 0%, var(--surface-1) 100%)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: "var(--space-5)",
          right: "var(--space-5)",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          transformOrigin: "center",
        }}
      />

      {/* Header/Thumbnail area */}
      {header && (
        <div style={{
          width: "100%",
          minHeight: "100px",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}>
          {header}
        </div>
      )}

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "var(--space-2)" 
        }}>
          {icon && (
            <span style={{ color: "var(--accent)", fontSize: "1.125rem" }}>
              {icon}
            </span>
          )}
          <h3 style={{
            fontSize: "1.0625rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}>
            {title}
          </h3>
        </div>
        <p style={{
          fontSize: "0.875rem",
          lineHeight: 1.65,
          color: "var(--text-tertiary)",
        }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default BentoGrid;
