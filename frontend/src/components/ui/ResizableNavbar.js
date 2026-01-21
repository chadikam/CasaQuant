import React, { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Context to share scroll state
const NavbarContext = createContext({ scrolled: false });

export const Navbar = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Set scrolled state for shrinking effect
          setScrolled(currentScrollY > 20);
          
          // Hide/show navbar based on scroll direction - increased threshold for longer visibility
          if (currentScrollY > lastScrollY && currentScrollY > 1800) {
            setVisible(false);
          } else {
            setVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <NavbarContext.Provider value={{ scrolled }}>
      <motion.nav
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "8px 16px" : "12px 24px",
          transition: "padding 0.3s ease",
          willChange: "transform, opacity",
          contain: "layout",
        }}
      >
        {children}
      </motion.nav>
    </NavbarContext.Provider>
  );
};

export const NavBody = ({ children }) => {
  const { scrolled } = useContext(NavbarContext);
  
  return (
    <motion.div
      animate={{
        maxWidth: scrolled ? "700px" : "1200px",
        padding: scrolled ? "8px 20px" : "0px",
        borderRadius: scrolled ? "9999px" : "0px",
        backgroundColor: scrolled ? "rgba(20, 20, 22, 0.95)" : "rgba(20, 20, 22, 0)",
        boxShadow: scrolled 
          ? "0 0 0 1px rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(62, 207, 207, 0.08)"
          : "none",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 auto",
        border: scrolled ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
        willChange: "transform",
      }}
      className="nav-body-desktop"
    >
      {children}
    </motion.div>
  );
};

export const NavbarLogo = ({ onClick }) => {
  const { scrolled } = useContext(NavbarContext);
  
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        fontSize: scrolled ? "1.125rem" : "1.25rem",
      }}
      transition={{ duration: 0.3 }}
      style={{
        fontWeight: 600,
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
        cursor: "pointer",
        minHeight: "1.5rem",
        display: "flex",
        alignItems: "center",
        willChange: "transform",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
    >
      CasaQuant
    </motion.div>
  );
};

export const NavItems = ({ items }) => {
  const { scrolled } = useContext(NavbarContext);
  
  return (
    <motion.div
      animate={{
        gap: scrolled ? "4px" : "8px",
      }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        willChange: "transform",
      }}
      className="nav-items-desktop"
    >
      {items.map((item, idx) => (
        <motion.a
          key={`nav-item-${idx}`}
          href={item.link}
          onClick={item.onClick}
          animate={{
            padding: scrolled ? "6px 10px" : "8px 12px",
            fontSize: scrolled ? "0.8125rem" : "0.875rem",
          }}
          transition={{ duration: 0.3 }}
          style={{
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
  const { scrolled } = useContext(NavbarContext);
  const isPrimary = variant === "primary";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        padding: scrolled 
          ? (isPrimary ? "8px 16px" : "8px 16px")
          : (isPrimary ? "10px 20px" : "10px 20px"),
        fontSize: scrolled ? "0.8125rem" : "0.875rem",
      }}
      transition={{ duration: 0.3 }}
      className={className}
      style={{
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
