import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { Heart } from 'lucide-react';

export function TimeCounter() {
  const [startDate, setStartDate] = useState('2021-12-17'); // Default input
  const [diff, setDiff] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateDiff = () => {
      // Allow local time to prevent timezone jumps
      const [year, month, day] = startDate.split('-').map(Number);
      if (!year || !month || !day) return;
      
      const start = new Date(year, month - 1, day, 0, 0, 0);
      const now = new Date();
      
      let y = now.getFullYear() - start.getFullYear();
      let m = now.getMonth() - start.getMonth();
      let d = now.getDate() - start.getDate();
      let h = now.getHours() - start.getHours();
      let min = now.getMinutes() - start.getMinutes();
      let s = now.getSeconds() - start.getSeconds();

      if (s < 0) { s += 60; min--; }
      if (min < 0) { min += 60; h--; }
      if (h < 0) { h += 24; d--; }
      if (d < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        d += prevMonth.getDate();
        m--;
      }
      if (m < 0) { m += 12; y--; }

      // Catch future dates gracefully
      if (y < 0) {
        setDiff({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setDiff({ years: y, months: m, days: d, hours: h, minutes: min, seconds: s });
    };

    calculateDiff();
    const interval = setInterval(calculateDiff, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const timeUnits = [
    { label: 'Years', value: diff.years },
    { label: 'Months', value: diff.months },
    { label: 'Days', value: diff.days },
    { label: 'Hours', value: diff.hours },
    { label: 'Minutes', value: diff.minutes },
    { label: 'Seconds', value: diff.seconds },
  ];

  return (
    <SectionWrapper id="timecounter" className="py-32 relative bg-[#171113] text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-premium-rosegold/5 to-transparent pointer-events-none" />
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-premium-rosegold/10"
            initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0, scale: Math.random() * 0.8 + 0.4 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.6, 0], 
              rotate: Math.random() * 360, 
              x: `${Math.random() * 100}vw` 
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity, 
              ease: "linear", 
              delay: Math.random() * 10 
            }}
          >
            <Heart className="w-8 h-8 md:w-16 md:h-16" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-16 relative z-10 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-6 tracking-tight drop-shadow-lg"
        >
          Our Time Together
        </motion.h2>
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="flex flex-col items-center gap-6"
        >
          <p className="text-xl md:text-3xl text-slate-300 font-light font-handwriting">
            Every second with you is a gift.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-3xl sm:rounded-full px-6 py-3 backdrop-blur-md shadow-xl shadow-black/40">
             <span className="text-sm text-slate-400 font-medium tracking-wide uppercase">Relationship Start Date:</span>
             <input 
               type="date" 
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
               className="bg-transparent text-premium-rosegold font-mono text-lg focus:outline-none focus:ring-0"
               style={{ colorScheme: 'dark' }}
             />
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {timeUnits.map((unit, i) => (
             <motion.div
               key={unit.label}
               initial={{ opacity: 0, scale: 0.8, y: 30 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.4 }}
             >
               <GlassCard className="w-28 h-28 md:w-36 md:h-36 bg-white/5 border-white/10 shadow-[0_0_25px_rgba(183,110,121,0.15)] hover:shadow-[0_0_45px_rgba(183,110,121,0.35)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center p-2 ring-1 ring-white/5">
                 <span className="font-serif text-4xl md:text-6xl text-premium-rosegold font-bold tracking-tighter drop-shadow-[0_0_12px_rgba(183,110,121,0.8)] tabular-nums">
                   {String(unit.value).padStart(2, '0')}
                 </span>
                 <span className="text-slate-300 font-medium text-[10px] md:text-xs uppercase tracking-[0.2em] mt-3 opacity-80">{unit.label}</span>
               </GlassCard>
             </motion.div>
          ))}
        </div>
      </div>
      
    </SectionWrapper>
  );
}
