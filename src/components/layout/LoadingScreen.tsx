import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-b from-[#fdfbf7] to-[#f4ebe6]"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="mb-8 relative"
          >
            {/* Glowing effect behind heart */}
            <div className="absolute inset-0 bg-premium-rosegold blur-xl opacity-30 rounded-full" />
            <Heart className="w-16 h-16 text-premium-rosegold relative z-10" fill="currentColor" />
          </motion.div>
          
          <motion.h1
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="font-serif text-2xl md:text-3xl text-slate-700 tracking-wide"
          >
            Preparing your memories...
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            className="h-1 bg-premium-rosegold/30 mt-6 rounded-full overflow-hidden"
          >
             <motion.div 
               className="h-full bg-premium-rosegold"
               initial={{ x: "-100%" }}
               animate={{ x: "0%" }}
               transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
             />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
