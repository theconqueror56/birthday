import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { Heart, Sparkles } from 'lucide-react';
import { AnimatedButton } from '../ui/AnimatedButton';
import { GlassCard } from '../ui/GlassCard';

const TOTAL_HEARTS = 12;

interface GameHeart {
  id: number;
  x: number; // percentage left
  y: number; // percentage top
  size: number;
  delay: number;
  duration: number;
  collected: boolean;
}

export function MiniGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [hearts, setHearts] = useState<GameHeart[]>([]);

  const startGame = () => {
    setHearts(
      Array.from({ length: TOTAL_HEARTS }).map((_, i) => ({
        id: i,
        x: Math.random() * 70 + 10, // 10% to 80% of container width
        y: Math.random() * 60 + 20, // 20% to 80% of container height
        size: Math.random() * 20 + 35, // 35px to 55px
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 3,
        collected: false
      }))
    );
    setGameState('playing');
  };

  const collectHeart = (id: number) => {
    setHearts(prev => prev.map(h => h.id === id ? { ...h, collected: true } : h));
  };

  const collectedCount = hearts.filter(h => h.collected).length;

  useEffect(() => {
    if (gameState === 'playing' && collectedCount === TOTAL_HEARTS) {
      setTimeout(() => setGameState('completed'), 800);
    }
  }, [collectedCount, gameState]);

  return (
    <SectionWrapper id="minigame" className="py-32 relative bg-gradient-to-b from-white to-premium-pink/30 overflow-hidden">
      
      <div className="text-center mb-12 relative z-10 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-4 tracking-tight"
        >
          Collect The Love
        </motion.h2>
        <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
           className="text-lg text-slate-500 font-light"
        >
          {gameState === 'idle' && "A little game just for you."}
          {gameState === 'playing' && "Catch all the floating hearts!"}
          {gameState === 'completed' && "You caught them all."}
        </motion.p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 relative z-10 h-[500px] md:h-[600px] flex flex-col items-center justify-center">
        
        {/* Play Area Container */}
        <div className="absolute inset-4 md:inset-0 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl shadow-premium-rosegold/5 overflow-hidden">
          
          <AnimatePresence mode="wait">
            {gameState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/50"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-premium-pink rounded-full flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                  <motion.div 
                    animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Heart className="w-10 h-10 md:w-12 md:h-12 text-premium-rosegold" fill="currentColor" />
                  </motion.div>
                </div>
                <h3 className="font-serif text-2xl text-slate-700 mb-8">Ready to play?</h3>
                <AnimatedButton onClick={startGame}>
                  Start Game
                </AnimatedButton>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div 
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Progress Bar */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-md border border-premium-rosegold/20 flex items-center gap-4 z-50">
                  <span className="font-serif text-premium-rosegold font-bold text-lg w-12 text-center">
                    {collectedCount} / {TOTAL_HEARTS}
                  </span>
                  <div className="w-32 md:w-48 h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-premium-rosegold to-premium-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${(collectedCount / TOTAL_HEARTS) * 100}%` }}
                      transition={{ type: "spring", bounce: 0 }}
                    />
                  </div>
                </div>

                {/* Floating Hearts */}
                {hearts.map((heart) => (
                  <AnimatePresence key={heart.id}>
                    {!heart.collected && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: [0, Math.random() * 40 + 20, Math.random() * -40 - 20, 0],
                          y: [0, Math.random() * -50 - 20, Math.random() * 50 + 20, 0]
                        }}
                        exit={{ scale: 2, opacity: 0, filter: "blur(4px)" }}
                        transition={{
                          opacity: { duration: 0.5 },
                          scale: { duration: 0.5, type: "spring", bounce: 0.5 },
                          x: { duration: heart.duration * 1.5, repeat: Infinity, ease: "easeInOut", delay: heart.delay },
                          y: { duration: heart.duration, repeat: Infinity, ease: "easeInOut", delay: heart.delay }
                        }}
                        onClick={() => collectHeart(heart.id)}
                        className="absolute cursor-pointer hover:scale-110 active:scale-90 transition-transform origin-center z-40 outline-none tap-highlight-transparent"
                        style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                      >
                        <Heart 
                          width={heart.size} 
                          height={heart.size} 
                          className="text-rose-500 drop-shadow-[0_4px_12px_rgba(225,29,72,0.5)]" 
                          fill="currentColor" 
                        />
                      </motion.button>
                    )}
                  </AnimatePresence>
                ))}
              </motion.div>
            )}

            {gameState === 'completed' && (
              <motion.div 
                key="completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center p-4 md:p-8 bg-white/60 backdrop-blur-sm"
              >
                {/* Celebration Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                   {[...Array(24)].map((_, i) => (
                     <motion.div
                       key={i}
                       className="absolute top-1/2 left-1/2"
                       initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                       animate={{ 
                         opacity: 0, 
                         scale: Math.random() * 2 + 1,
                         x: (Math.random() - 0.5) * (window.innerWidth < 768 ? 300 : 600),
                         y: (Math.random() - 0.5) * (window.innerWidth < 768 ? 400 : 600),
                         rotate: Math.random() * 360
                       }}
                       transition={{ duration: 2, ease: "easeOut", delay: 0.1 }}
                     >
                       <Heart className="w-6 h-6 text-premium-rosegold" fill="currentColor" />
                     </motion.div>
                   ))}
                </div>

                <GlassCard className="max-w-lg w-full text-center relative z-10 p-8 md:p-12 border-premium-rosegold/30 bg-white/95 shadow-2xl">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-tr from-premium-rosegold to-premium-gold rounded-full flex items-center justify-center mb-6 shadow-xl shadow-premium-rosegold/30 border-2 border-white">
                       <Sparkles className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">
                      You unlocked a secret ❤️
                    </h3>
                    <div className="w-12 h-1 bg-premium-rosegold/50 rounded-full my-6" />
                    
                    <p className="font-handwriting text-2xl md:text-3xl text-slate-700 leading-relaxed">
                      "Out of all the beautiful things in this world, my favorite thing will always be loving you. Thank you for being the best part of my life. Happy Birthday!"
                    </p>
                  </motion.div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </SectionWrapper>
  );
}
