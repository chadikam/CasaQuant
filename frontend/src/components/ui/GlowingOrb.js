import React from "react";
import { motion } from "framer-motion";

export const GlowingOrb = ({ 
  size = 400, 
  color = "rgba(62, 207, 207, 0.15)",
  blur = 80,
  className = "",
  animate = true,
}) => {
  return (
    <motion.div
      className={`glowing-orb ${className}`}
      initial={{ opacity: 0 }}
      animate={animate ? {
        opacity: [0.4, 0.6, 0.4],
        scale: [1, 1.1, 1],
      } : { opacity: 0.5 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

export const FloatingParticles = ({ count = 20, className = "" }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div 
      className={`floating-particles ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
          }}
          animate={{
            y: [`${particle.y}%`, `${particle.y - 30}%`, `${particle.y}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 6px var(--accent)",
          }}
        />
      ))}
    </div>
  );
};

export default GlowingOrb;
