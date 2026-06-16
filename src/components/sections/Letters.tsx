import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { LETTERS } from '../../data/letters';
import type { Letter } from '../../data/letters';
import { X } from 'lucide-react';

export function Letters() {
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);

  return (
    <SectionWrapper id="letters" className="py-32 relative bg-premium-pink/5">
      <div className="text-center mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-6 tracking-tight"
        >
          Letters From My Heart
        </motion.h2>
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="text-lg md:text-xl text-slate-600 font-light"
        >
          A few words written just for you. Open when you need them most.
        </motion.p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-8 pb-10">
        {LETTERS.map((letter, i) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15, type: "spring", bounce: 0.4 }}
          >
            <Envelope letter={letter} onOpen={() => setActiveLetter(letter)} />
          </motion.div>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {activeLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
              onClick={() => setActiveLetter(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 100, opacity: 0, rotateX: 10 }}
                animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, y: 100, opacity: 0, rotateX: -10 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl min-h-[50vh] max-h-[90vh] overflow-y-auto p-8 md:p-14 rounded-sm shadow-2xl relative border border-[#e5dcd3] bg-[#fcfaf5]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                }}
              >
                 <button 
                  onClick={() => setActiveLetter(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm border border-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="font-serif text-3xl md:text-4xl text-premium-rosegold mb-10 text-center mt-4 tracking-wide border-b border-premium-rosegold/20 pb-6">
                  {activeLetter.title}
                </h3>
                
                <div className="font-handwriting text-3xl md:text-4xl text-slate-700 leading-relaxed md:leading-loose whitespace-pre-wrap">
                  {activeLetter.content}
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

function Envelope({ letter, onOpen }: { letter: Letter, onOpen: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Sequence: Flap opens (0.5s), Letter slides up (0.6s). Total wait: ~1s.
    setTimeout(() => {
      onOpen();
      // Reset envelope after a delay so it's closed when they come back
      setTimeout(() => setIsOpen(false), 500);
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-[260px] h-[170px] mx-auto cursor-pointer group" onClick={handleClick}>
      
      {/* Label outside envelope */}
      <div className="absolute -bottom-12 left-0 w-full text-center group-hover:translate-y-1 transition-transform duration-300">
        <span className="font-serif text-premium-rosegold font-medium text-lg tracking-wide">{letter.title}</span>
      </div>

      <motion.div 
        className="relative w-full h-full perspective-[1000px]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#e3bcc3] rounded-sm shadow-xl" />

        {/* The Letter inside */}
        <motion.div 
          className="absolute top-2 left-3 right-3 bottom-2 bg-[#fcfaf5] rounded-sm shadow-sm flex flex-col items-center justify-start p-4 pt-6 border border-[#e5dcd3]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            zIndex: 10
          }}
          initial={{ y: 0 }}
          animate={{ y: isOpen ? -90 : 0 }}
          transition={{ duration: 0.6, delay: isOpen ? 0.4 : 0, ease: "backOut" }}
        >
           {/* Mock text lines */}
           <div className="w-16 h-1 bg-premium-rosegold/30 rounded-full mb-3 self-start" />
           <div className="w-full h-1 bg-premium-rosegold/10 rounded-full mb-2" />
           <div className="w-full h-1 bg-premium-rosegold/10 rounded-full mb-2" />
           <div className="w-3/4 h-1 bg-premium-rosegold/10 rounded-full mb-2" />
        </motion.div>

        {/* Envelope Flaps Container */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-sm drop-shadow-md">
          {/* Left Flap */}
          <div className="absolute inset-0 bg-[#f4d6dc]" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }} />
          {/* Right Flap */}
          <div className="absolute inset-0 bg-[#f2d3d9]" style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }} />
          {/* Bottom Flap */}
          <div className="absolute inset-0 bg-[#fae6ea]" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }} />
        </div>

        {/* Top Flap (Animated) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[#ebd1d6] origin-top drop-shadow-sm"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
          }}
          initial={{ rotateX: 0, zIndex: 30 }}
          animate={{ 
            rotateX: isOpen ? 180 : 0, 
            zIndex: isOpen ? 5 : 30 
          }}
          transition={{ duration: 0.5, zIndex: { delay: isOpen ? 0.25 : 0 } }}
        />
        
        {/* Wax Seal */}
        <motion.div 
          className="absolute top-[48%] left-1/2 w-12 h-12 bg-[#b76e79] rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-md border-[3px] border-[#a05f69]"
          style={{ zIndex: 35 }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-serif text-white/90 font-bold text-xl drop-shadow-sm">♡</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
