import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/20"
    >
      <div className="flex items-center gap-2">
        <Gift className="w-6 h-6 text-premium-rosegold" />
        <span className="font-serif font-semibold text-lg text-premium-dark tracking-wide">
          Time Capsule
        </span>
      </div>
      <div className="flex gap-6 text-sm font-medium">
        <a href="#memories" className="hover:text-premium-rosegold transition-colors duration-300">Memories</a>
        <a href="#messages" className="hover:text-premium-rosegold transition-colors duration-300">Messages</a>
      </div>
    </motion.nav>
  );
}
