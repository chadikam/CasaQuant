import React, { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

// Context to share scroll state
const NavbarContext = createContext({ scrolled: false });

export const Navbar = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Initialize on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavbarContext.Provider value={{ scrolled }}>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
        {children}
      </nav>
    </NavbarContext.Provider>
  );
};

export const NavBody = ({ children }) => {
  return (
    <div
      className="nav-body-desktop"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 auto",
        maxWidth: "1200px",
        padding: "0 24px",
      }}
    >
      {children}
    </div>
  );
};

export const NavbarLogo = ({ onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        willChange: "transform",
      }}
    >
      <motion.div
        style={{
          background: "linear-gradient(135deg, rgba(62, 207, 207, 0.1), rgba(62, 207, 207, 0.05))",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          width: "38px",
          height: "38px",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <motion.div
          style={{
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
        >
          CasaQuant
        </motion.div>
        <motion.div
          style={{
            color: "var(--text-secondary)",
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: 1,
          }}
        >
          Property Valuation Intelligence
        </motion.div>
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items }) => {
  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        willChange: "transform",
      }}
      className="nav-items-desktop"
    >
      {items.map((item, idx) => (
        <motion.a
          key={`nav-item-${idx}`}
          href={item.link}
          onClick={item.onClick}
          style={{
            padding: "8px 12px",
            fontSize: "0.875rem",
            fontWeight: 450,
            color: "var(--text-tertiary)",
            textDecoration: "none",
            borderRadius: "var(--radius-sm)",
            transition: "color 150ms ease, background-color 150ms ease",
            willChange: "transform",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.backgroundColor = "var(--surface-2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-tertiary)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {item.name}
        </motion.a>
      ))}
    </motion.div>
  );
};

export const NavbarButton = ({ children, variant = "primary", onClick, className = "" }) => {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      style={{
        padding: isPrimary ? "10px 20px" : "10px 20px",
        fontSize: "0.875rem",
        fontWeight: 550,
        color: isPrimary ? "var(--bg-primary)" : "var(--text-secondary)",
        background: isPrimary 
          ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)"
          : "var(--surface-2)",
        border: isPrimary ? "none" : "1px solid var(--border-default)",
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        boxShadow: isPrimary 
          ? "0 0 0 1px rgba(62, 207, 207, 0.3), 0 2px 12px rgba(62, 207, 207, 0.2)"
          : "none",
      }}
      onMouseEnter={(e) => {
        if (!isPrimary) {
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.borderColor = "var(--border-emphasis)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isPrimary) {
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.borderColor = "var(--border-default)";
        }
      }}
    >
      {children}
    </motion.button>
  );
};

export const MobileNav = ({ children }) => {
  return (
    <div className="nav-mobile" style={{ display: "none" }}>
      {children}
    </div>
  );
};

export const MobileNavHeader = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
      aria-label="Toggle menu"
    >
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: "24px",
          height: "2px",
          backgroundColor: "var(--text-primary)",
          borderRadius: "2px",
        }}
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: "24px",
          height: "2px",
          backgroundColor: "var(--text-primary)",
          borderRadius: "2px",
        }}
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: "24px",
          height: "2px",
          backgroundColor: "var(--text-primary)",
          borderRadius: "2px",
        }}
      />
    </button>
  );
};

export const MobileNavMenu = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: "65px",
            left: 0,
            right: 0,
            background: "var(--bg-elevated)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxHeight: "calc(100vh - 65px)",
            overflowY: "auto",
          }}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === "a") {
              return React.cloneElement(child, {
                style: {
                  ...child.props.style,
                  padding: "12px 0",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-subtle)",
                },
              });
            }
            return child;
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
