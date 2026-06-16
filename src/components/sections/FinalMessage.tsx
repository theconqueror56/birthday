import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { AnimatedButton } from '../ui/AnimatedButton';
import { TypewriterText } from '../effects/TypewriterText';
import { X, Heart } from 'lucide-react';

export function FinalMessage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SectionWrapper id="final" className="py-40 relative bg-[#0a0508] text-white overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* Soft Glowing Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium-rosegold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-gold/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-premium-pink/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + 'vw',
              top: Math.random() * 100 + 'vh',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-12 tracking-wider drop-shadow-2xl text-center"
        >
          One Last Thing...
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <GlassCard className="bg-white/5 border border-white/10 p-8 md:p-14 text-center shadow-[0_0_50px_rgba(183,110,121,0.15)] backdrop-blur-xl rounded-2xl flex flex-col items-center">
            
            <div className="min-h-[140px] md:min-h-[100px] flex items-center justify-center mb-10 w-full max-w-lg mx-auto">
              <TypewriterText 
                text="I hope this time capsule brought a smile to your face. But before you go, there's a little more I  need to say..."
                className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed font-serif italic"
                delay={1.5}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 6.5 }} // Wait for the typewriter effect to finish typing
            >
              <AnimatedButton onClick={() => setIsModalOpen(true)} className="px-8 py-4 text-lg bg-premium-rosegold text-white hover:bg-premium-rosegold/90 hover:shadow-[0_0_20px_rgba(183,110,121,0.4)]">
                <span className="flex items-center gap-3 font-medium tracking-wide">
                  Open My Final Message <Heart className="w-5 h-5 fill-white animate-pulse" />
                </span>
              </AnimatedButton>
            </motion.div>

          </GlassCard>
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-16 rounded-sm shadow-2xl relative border border-[#e5dcd3] bg-[#fcfaf5] text-slate-800 custom-scrollbar"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                }}
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors shadow-sm border border-gray-200 z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex justify-center mb-8 mt-2">
                   <Heart className="w-12 h-12 text-premium-rosegold drop-shadow-md" fill="currentColor" />
                </div>

                <h3 className="font-serif text-3xl md:text-5xl text-premium-rosegold mb-10 text-center tracking-wide font-bold">
                  Happy Birthday, My Love.
                </h3>
                
                <div className="font-handwriting text-2xl md:text-4xl text-slate-700 leading-relaxed md:leading-loose whitespace-pre-wrap space-y-6">
                  <p>Building this time capsule for you made me realize just how incredibly lucky I am to have you in my life.</p>
                  <p>Every photo, every song, every little memory we've shared... they are the greatest treasures I could ever ask for. You make the world a brighter, kinder, and infinitely more beautiful place just by being in it.</p>
                  <p>I hope today brings you even a fraction of the joy that you bring to me every single day. I promise to spend the rest of my life making sure you always feel as special as you truly are.</p>
                  <p>Here's to a hundred more birthdays, a thousand more memories, and a lifetime of loving you.</p>
                  
                  <div className="pt-8 flex flex-col items-end text-premium-rosegold">
                    <p className="pr-4">Yours forever,</p>
                    <p className="pr-12">Naman Singh</p>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </SectionWrapper>
  );
}
