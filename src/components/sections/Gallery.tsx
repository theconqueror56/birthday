import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { GALLERY_IMAGES } from '../../data/gallery';
import type { GalleryImage } from '../../data/gallery';
import { X, ZoomIn } from 'lucide-react';

export function Gallery() {
  const [selectedImg, setSelectedImg] = useState<GalleryImage | null>(null);

  return (
    <SectionWrapper id="gallery" className="py-32 relative overflow-hidden bg-white/50">
      
      {/* Subtle decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-premium-pink/40 via-transparent to-transparent pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-6 tracking-tight"
        >
          A Collection of Moments
        </motion.h2>
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="text-lg md:text-xl text-slate-600 font-light"
        >
          Beautiful fragments of our journey together.
        </motion.p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 z-10">
        {/* CSS-based Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: "easeOut" }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-premium-rosegold/20 transition-all duration-500"
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={img.src} 
                // alt={img.alt} 
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Romantic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-premium-rosegold/80 via-premium-rosegold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center mix-blend-multiply pointer-events-none" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100"
                >
                  <ZoomIn className="w-12 h-12 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]" strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl cursor-pointer"
          >
            <button 
              onClick={() => setSelectedImg(null)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-50 backdrop-blur-md border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
            >
              <img 
                src={selectedImg.src} 
                // alt={selectedImg.alt} 
                loading="lazy"
                decoding="async" 
                className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
