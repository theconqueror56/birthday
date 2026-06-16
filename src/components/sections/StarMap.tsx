import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { useStarMap } from '../../hooks/useStarMap';
import { MapPin, Calendar, ZoomIn, ZoomOut, Stars } from 'lucide-react';

export function StarMap() {
  const [date, setDate] = useState('June 19, 2026');
  const [location, setLocation] = useState('Jalandhar, Punjab');
  const [zoom, setZoom] = useState(1);
  
  const { data, loading } = useStarMap(date, location);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  return (
    <SectionWrapper id="starmap" className="py-32 relative bg-[#060813] text-white overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-6 tracking-tight drop-shadow-md"
        >
          The Sky On A Special Day
        </motion.h2>
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="text-2xl md:text-3xl text-slate-300 font-light font-handwriting tracking-wide"
        >
          Even the stars were celebrating.
        </motion.p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Controls / Inputs Container */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl md:rounded-full py-4 px-8 mb-12 gap-6 shadow-2xl shadow-black/50">
           
           <div className="flex flex-col sm:flex-row items-center gap-6 flex-wrap justify-center flex-1 w-full md:w-auto">
             <div className="flex items-center gap-3 w-full sm:w-auto">
                <Calendar className="w-5 h-5 text-premium-rosegold" />
                <input 
                  type="text" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent border-b border-white/20 text-base md:text-sm pb-1 focus:outline-none focus:border-premium-rosegold text-white w-full sm:w-36 transition-colors placeholder:text-white/30"
                  placeholder="Enter a date"
                />
             </div>
             <div className="flex items-center gap-3 w-full sm:w-auto">
                <MapPin className="w-5 h-5 text-premium-rosegold" />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-b border-white/20 text-base md:text-sm pb-1 focus:outline-none focus:border-premium-rosegold text-white w-full sm:w-40 transition-colors placeholder:text-white/30"
                  placeholder="Enter a location"
                />
             </div>
           </div>
           
           {/* Zoom Controls */}
           <div className="flex items-center gap-3 justify-center w-full md:w-auto border-t border-white/10 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-6">
             <button onClick={handleZoomOut} disabled={zoom <= 1} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
               <ZoomOut className="w-5 h-5 text-slate-300" />
             </button>
             <span className="text-sm text-premium-rosegold font-mono w-12 text-center tracking-wider">{Math.round(zoom * 100)}%</span>
             <button onClick={handleZoomIn} disabled={zoom >= 3} className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
               <ZoomIn className="w-5 h-5 text-slate-300" />
             </button>
           </div>
        </div>

        {/* Map Viewport Container */}
        <div className="w-full max-w-[600px] aspect-square rounded-full bg-gradient-to-b from-[#020510] to-[#0a1128] border-8 border-white/5 shadow-[0_0_80px_rgba(183,110,121,0.15)] relative overflow-hidden flex items-center justify-center ring-1 ring-white/10 ring-offset-4 ring-offset-[#060813]">
           
           {loading ? (
             <motion.div 
               animate={{ opacity: [0.4, 1, 0.4] }} 
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
               className="flex flex-col items-center gap-4 text-premium-rosegold"
             >
               <Stars className="w-10 h-10 animate-spin-slow" />
               <span className="font-serif italic text-lg tracking-widest">Aligning the stars...</span>
             </motion.div>
           ) : (
             <motion.div 
               className="absolute inset-0 w-full h-full origin-center cursor-grab active:cursor-grabbing"
               animate={{ scale: zoom }}
               transition={{ type: "spring", stiffness: 100, damping: 20 }}
               drag
               dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
             >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   {/* Draw Stars */}
                   {data?.stars.map((star, i) => (
                      <motion.circle 
                        key={i}
                        cx={star.x} 
                        cy={star.y} 
                        r={star.size / 5} 
                        fill="#fff" 
                        opacity={star.brightness}
                        animate={{ opacity: [star.brightness * 0.4, star.brightness, star.brightness * 0.4] }}
                        transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                      />
                   ))}

                   {/* Draw Constellation Lines */}
                   {data?.constellations.map((constellation, i) => (
                     <g key={`const-${i}`}>
                       <motion.polyline 
                         points={constellation.points.map(p => `${p[0]},${p[1]}`).join(' ')}
                         fill="none"
                         stroke="rgba(255,255,255,0.25)"
                         strokeWidth="0.2"
                         initial={{ pathLength: 0, opacity: 0 }}
                         animate={{ pathLength: 1, opacity: 1 }}
                         transition={{ duration: 3, ease: "easeInOut" }}
                       />
                       <motion.text 
                         x={constellation.points[0][0]} 
                         y={constellation.points[0][1] - 1.5}
                         fill="rgba(183,110,121,0.9)"
                         fontSize="1.8"
                         className="font-serif tracking-widest uppercase"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 2, duration: 1 }}
                       >
                         {constellation.name}
                       </motion.text>
                     </g>
                   ))}

                   {/* Draw Star Labels */}
                   {data?.stars.filter(s => s.label).map((star, i) => (
                     <motion.text 
                       key={`label-${i}`}
                       x={star.x + 1} 
                       y={star.y + 0.5}
                       fill="rgba(255,255,255,0.6)"
                       fontSize="1.2"
                       className="font-sans font-light tracking-wide"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 1, duration: 1 }}
                     >
                       {star.label}
                     </motion.text>
                   ))}
                </svg>

                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
             </motion.div>
           )}
           
           {/* Center Crosshair or Compass Marks - Fixed position regardless of zoom/drag */}
           <div className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none z-20" />
           <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-white/40 tracking-[0.3em] font-serif z-20">N</div>
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/40 tracking-[0.3em] font-serif z-20">S</div>
           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-white/40 tracking-[0.3em] font-serif z-20">W</div>
           <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/40 tracking-[0.3em] font-serif z-20">E</div>
        </div>
        
        {/* Context Caption */}
        <div className="mt-14 max-w-lg text-center relative z-10 px-4">
           <div className="w-12 h-px bg-premium-rosegold/40 mx-auto mb-6" />
           <p className="text-slate-400 font-light italic leading-relaxed text-sm md:text-base">
             This represents the alignment of the stars above <span className="text-white/80 not-italic border-b border-premium-rosegold/30 pb-0.5">{location}</span> on <span className="text-white/80 not-italic border-b border-premium-rosegold/30 pb-0.5">{date}</span>. A perfect sky for a perfect moment.
           </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
