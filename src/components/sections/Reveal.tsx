import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { TypewriterText } from '../effects/TypewriterText';
import { Heart } from 'lucide-react';

const Balloon = ({ color, delay, left, size = 'md' }: { color: string, delay: number, left: string, size?: 'sm'|'md'|'lg' }) => {
  const sizeClasses = {
    sm: 'w-12 h-16',
    md: 'w-16 h-20 md:w-20 md:h-28',
    lg: 'w-20 h-28 md:w-28 md:h-36'
  };

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{ left }}
      initial={{ y: "120vh", x: 0 }}
      whileInView={{ 
        y: "-50vh",
        x: [0, Math.random() * 50 > 25 ? 50 : -50, 0] // Gentle sway
      }}
      viewport={{ once: false }}
      transition={{ 
        y: { duration: Math.random() * 5 + 10, delay, repeat: Infinity, ease: "linear" },
        x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className={`${sizeClasses[size]} rounded-[50%] ${color} shadow-lg relative`}>
        {/* Balloon string */}
        <div className="absolute top-full left-1/2 w-0.5 h-32 md:h-48 bg-white/40 -translate-x-1/2"></div>
        {/* Balloon shine */}
        <div className="absolute top-2 left-2 w-3 h-5 md:w-5 md:h-8 bg-white/40 rounded-[50%] rotate-45 blur-[1px]"></div>
      </div>
    </motion.div>
  );
};

export function Reveal() {
  return (
    <SectionWrapper id="reveal" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-premium-pink/20">
      
      {/* Background Balloons */}
      <Balloon color="bg-premium-rosegold" delay={0.2} left="10%" size="lg" />
      <Balloon color="bg-premium-lavender" delay={2.5} left="25%" size="md" />
      <Balloon color="bg-white" delay={1.0} left="70%" size="lg" />
      <Balloon color="bg-premium-gold/80" delay={3.2} left="85%" size="sm" />
      <Balloon color="bg-premium-rosegold" delay={4.5} left="50%" size="md" />

      {/* Floating Hearts & Confetti Simulation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{ color: i % 2 === 0 ? '#b76e79' : '#d4af37' }} // Rosegold or Gold
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: '120vh',
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
              rotate: 0
            }}
            whileInView={{
              y: '-20vh',
              opacity: [0, 0.8, 0.8, 0],
              rotate: Math.random() * 360
            }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
              duration: Math.random() * 5 + 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {i % 3 === 0 ? (
              // Confetti pieces
              <div className="w-2 h-4 rounded-sm bg-current" />
            ) : (
              // Hearts
              <Heart fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 opacity-40" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: true }}
          className="glass-panel p-10 md:p-16 border border-white/50 relative overflow-hidden"
        >
          {/* Subtle inner shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/40 to-white/10 opacity-50" />

          <h2 className="relative z-10 font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-premium-rosegold tracking-tight leading-tight">
            Happy Birthday <br />
            <span className="text-premium-dark text-6xl md:text-8xl mt-4 inline-block">Prabhleen Sarna</span> 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block ml-4 text-rose-500"
            >❤️</motion.span>
          </h2>

          <div className="relative z-10 mt-12 text-xl md:text-3xl text-slate-700 font-light tracking-wide font-serif h-12">
            <TypewriterText text="Today we celebrate someone truly special." delay={2} />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
