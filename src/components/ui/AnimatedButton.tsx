import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function AnimatedButton({ children, className, variant = 'primary', ...props }: AnimatedButtonProps) {
  const baseClasses = "relative overflow-hidden px-8 py-4 rounded-full font-medium tracking-wide transition-colors duration-300 flex items-center justify-center gap-2 z-10 shadow-lg";
  
  const variants = {
    primary: "bg-premium-dark text-premium-pink hover:bg-slate-800 shadow-premium-dark/20",
    secondary: "bg-white text-premium-dark hover:bg-slate-50 shadow-white/40",
    outline: "border border-premium-rosegold text-premium-dark hover:bg-premium-rosegold/10 shadow-none",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shimmer line effect on hover */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      >
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
      </motion.div>
    </motion.button>
  );
}
