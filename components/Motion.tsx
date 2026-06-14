"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Container that staggers its <StaggerItem> children on mount (hero entrances). */
export function StaggerGroup({ children, className = "", stagger = 0.06 }: { children: ReactNode; className?: string; stagger?: number }) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger } },
  };
  return (
    <motion.div className={className} variants={container} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

/** Child of <StaggerGroup>: y 12 -> 0 + fade, 400ms ease-out. Static when reduced motion. */
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const item: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Micro-lift on hover for CTAs (transform only; shadow handled by button CSS). */
export function HoverLift({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`inline-flex ${className}`}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { y: 0 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
