import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { Gift, Sparkles } from 'lucide-react';

export function Landing() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // In a full app, this would scroll to the next section or route after a delay
  };

  return (
    <SectionWrapper className="relative overflow-hidden flex items-center justify-center min-h-screen pt-20">
      {/* Decorative Sparkles in background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Sparkles className="absolute top-1/4 left-1/4 text-premium-gold w-6 h-6 animate-pulse-slow" />
        <Sparkles className="absolute top-1/3 right-1/4 text-premium-rosegold w-8 h-8 animate-float" />
        <Sparkles className="absolute bottom-1/3 left-1/3 text-[#f3e8ff] w-5 h-5 animate-float-delayed" />
      </motion.div>

      <div className="z-10 flex flex-col items-center justify-center text-center max-w-3xl px-4 w-full">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-state"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center w-full"
            >
              {/* Floating Capsule/Gift */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-12 relative group"
              >
                <div className="absolute inset-0 bg-premium-rosegold blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500" />
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl glass-panel flex items-center justify-center shadow-2xl border border-white/40">
                  <Gift className="w-16 h-16 md:w-20 md:h-20 text-premium-rosegold" />
                </div>
              </motion.div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient tracking-tight leading-tight">
                A collection of memories<br />made especially for you.
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 font-light mb-12 tracking-wide">
                Open your birthday time capsule.
              </p>

              <AnimatedButton onClick={handleOpen} variant="primary" className="text-lg px-10 py-5">
                Open The Capsule 🎁
              </AnimatedButton>
            </motion.div>
          ) : (
            <motion.div
              key="opened-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center w-full min-h-[50vh] justify-center"
            >
               {/* Opened state burst */}
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 0.5, type: "spring" }}
                 className="relative flex items-center justify-center"
               >
                 {/* Burst sparkles */}
                 {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-premium-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos((i * 22.5) * Math.PI / 180) * (Math.random() * 150 + 100),
                        y: Math.sin((i * 22.5) * Math.PI / 180) * (Math.random() * 150 + 100),
                        opacity: 0,
                        scale: 0
                      }}
                      transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                    />
                 ))}
                 <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="glass-panel p-10 md:p-16 text-center"
                 >
                    <h2 className="font-serif text-3xl md:text-5xl text-premium-rosegold mb-4">
                      The journey begins...
                    </h2>
                    <p className="text-slate-600 font-light">
                      Scroll down to view your memories.
                    </p>
                 </motion.div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </SectionWrapper>
  );
}
