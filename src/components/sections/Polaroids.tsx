import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { POLAROIDS } from '../../data/polaroids';
import type { Polaroid } from '../../data/polaroids';
import { X } from 'lucide-react';

export function Polaroids() {
  const [selectedImage, setSelectedImage] = useState<Polaroid | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper id="polaroids" className="py-32 relative overflow-hidden bg-gradient-to-b from-white/10 to-premium-pink/20">
      
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-6 tracking-tight"
        >
          Polaroid Memories
        </motion.h2>
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto px-4"
        >
          Some moments are too beautiful to forget. Drag them around, or click to take a closer look.
        </motion.p>
      </div>

      <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 min-h-[600px] relative flex flex-wrap justify-center items-center gap-8 md:gap-12 z-10">
        {POLAROIDS.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            whileDrag={{ scale: 1.1, zIndex: 40, rotate: 0, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, scale: 0.5, rotate: item.rotation - 15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: item.rotation }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => setSelectedImage(item)}
            className="w-64 md:w-72 bg-[#fcfcfc] p-4 pb-12 md:pb-16 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.12)] cursor-grab active:cursor-grabbing transform-gpu border border-gray-100"
          >
            {/* The Photo */}
            <div className="w-full bg-gray-200 overflow-hidden mb-4 rounded-sm border border-black/5 pointer-events-none shadow-inner flex items-center justify-center">
              <img src={item.image} alt={item.caption} className="w-full h-auto max-h-[400px] object-contain grayscale-[20%] sepia-[10%] contrast-110" draggable={false} loading="lazy" decoding="async" />
            </div>
            
            {/* Handwritten Caption & Date */}
            <div className="absolute bottom-4 w-full left-0 px-4 flex flex-col items-center pointer-events-none">
              <span className="font-handwriting text-2xl md:text-3xl text-slate-700 tracking-wide text-center leading-tight">
                {item.caption}
              </span>
              <span className="font-handwriting text-slate-400 text-sm md:text-base mt-1">
                {/* {item.date} */}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enlarged Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-md cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20, rotate: 5 }}
                transition={{ type: "spring", bounce: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#fcfcfc] p-6 pb-20 md:p-8 md:pb-28 rounded-sm shadow-2xl relative max-w-2xl w-full"
              >
                <button 
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close Lightbox"
                  className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-500 hover:text-slate-800 transition-colors z-10 border border-gray-100"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                
                <div className="w-full bg-gray-100 overflow-hidden rounded-sm border border-black/5 shadow-inner flex items-center justify-center">
                  <img src={selectedImage.image} alt={selectedImage.caption} className="w-full h-auto max-h-[60vh] object-contain grayscale-[10%] sepia-[10%] contrast-110" loading="lazy" decoding="async" />
                </div>
                
                <div className="absolute bottom-6 md:bottom-8 w-full left-0 px-6 flex flex-col items-center">
                  <span className="font-handwriting text-4xl md:text-5xl text-slate-700 text-center">
                    {selectedImage.caption}
                  </span>
                  <span className="font-handwriting text-slate-400 text-xl md:text-2xl mt-2">
                    {/* {selectedImage.date}    */}
                  </span>
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
