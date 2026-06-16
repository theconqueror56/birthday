import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { REASONS } from '../../data/reasons';

export function Reasons() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <SectionWrapper id="reasons" className="py-24 relative overflow-hidden bg-gradient-to-b from-premium-pink/20 to-white/10">
      
      {/* Decorative subtle background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-premium-lavender/30 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="text-center mb-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-6 tracking-tight"
        >
          Reasons You're Amazing
        </motion.h2>
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="text-lg md:text-xl text-slate-600 font-light"
        >
          Just a few of the countless things that make you so special.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl mx-auto px-4 relative z-10"
      >
        {REASONS.map((reason) => (
          <GlassCard 
            key={reason.id} 
            variants={item}
            className="h-full flex flex-col items-center text-center p-8 group hover:shadow-[0_8px_32px_0_rgba(212,175,55,0.25)] transition-all duration-500 hover:-translate-y-2 border-white/40"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-premium-pink to-white shadow-sm flex items-center justify-center mb-6 text-premium-rosegold group-hover:scale-110 group-hover:text-premium-gold transition-transform duration-500">
              <reason.icon className="w-8 h-8 drop-shadow-sm" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-premium-dark mb-4">
              {reason.title}
            </h3>
            <p className="text-slate-600 font-light text-sm leading-relaxed">
              {reason.description}
            </p>
          </GlassCard>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
