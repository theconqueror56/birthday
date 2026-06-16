import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { SONGS } from '../../data/songs';
import { Music, Disc3 } from 'lucide-react';


const FloatingNotes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-premium-rosegold/20"
          initial={{
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0],
            rotate: Math.random() * 360
          }}
          transition={{
            duration: Math.random() * 12 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          {i % 2 === 0 
            ? <Music className="w-6 h-6 md:w-10 md:h-10" /> 
            : <Disc3 className="w-5 h-5 md:w-8 md:h-8" />
          }
        </motion.div>
      ))}
    </div>
  );
};



const Equalizer = () => {
  return (
    <div className="flex items-end justify-center gap-1.5 h-12 w-full mt-4">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 bg-gradient-to-t from-premium-rosegold to-premium-gold rounded-t-sm shadow-[0_0_8px_rgba(212,175,55,0.6)]"
          animate={{ 
            height: ["20%", "100%", "40%", "80%", "30%"] 
          }}
          transition={{
            duration: Math.random() * 0.8 + 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
};



const VinylRecord = () => {
  return (
    <div className="relative flex justify-center items-center">

      <motion.div
        className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#111] shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-[6px] border-[#222] flex items-center justify-center relative overflow-hidden"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >

        <div className="absolute inset-3 rounded-full border border-white/10" />
        <div className="absolute inset-6 rounded-full border border-white/5" />
        <div className="absolute inset-10 rounded-full border border-white/10" />
        <div className="absolute inset-14 rounded-full border border-white/5" />

        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-premium-rosegold border-[3px] border-premium-gold flex items-center justify-center shadow-inner relative z-10">

          <div className="w-3 h-3 rounded-full bg-[#111]" />

          <span className="absolute font-serif text-[6px] md:text-[8px] text-white/80 top-2 tracking-widest uppercase">
            Our Story
          </span>

        </div>

      </motion.div>

    </div>
  );
};




export function Playlist() {

  const [selectedSong, setSelectedSong] = useState(SONGS[0]);


  return (

    <SectionWrapper 
      id="playlist" 
      className="py-32 relative bg-[#151314] overflow-hidden"
    >

      <FloatingNotes />


      <div className="text-center mb-20 relative z-10 px-4">

        <motion.h2
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:1}}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-premium-rosegold mb-6"
        >
          Songs That Remind Me Of You
        </motion.h2>


        <motion.p
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          viewport={{once:true}}
          transition={{duration:1,delay:.3}}
          className="text-lg md:text-xl text-slate-300 font-light"
        >
          The soundtrack of our most beautiful moments.
        </motion.p>


      </div>




      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">



        {/* LEFT SIDE */}

        <motion.div
          initial={{opacity:0,x:-40}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
          transition={{duration:1}}
          className="lg:col-span-5 flex flex-col items-center justify-center gap-10"
        >


          <div className="relative">

            <VinylRecord />

            <Equalizer />

          </div>




          {/* YOUTUBE PLAYER */}

          <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 p-2">


            <iframe

              key={selectedSong.youtubeId}

              width="100%"

              height="250"

              src={`https://www.youtube.com/embed/${selectedSong.youtubeId}?autoplay=1&rel=0`}

              title={selectedSong.name}

              frameBorder="0"

              allow="autoplay; encrypted-media"

              allowFullScreen

              className="rounded-xl"

            />


          </div>


        </motion.div>






        {/* RIGHT SIDE SONGS */}


        <motion.div

          initial={{opacity:0,x:40}}

          whileInView={{opacity:1,x:0}}

          viewport={{once:true}}

          transition={{duration:1,delay:.2}}

          className="lg:col-span-7 flex flex-col gap-6 max-h-[700px] overflow-y-auto"

        >



          {SONGS.map((song,i)=>(


            <motion.div

              key={song.id}

              initial={{opacity:0,y:20}}

              whileInView={{opacity:1,y:0}}

              viewport={{once:true}}

              transition={{duration:.6,delay:i*.15}}

            >


              <GlassCard

                onClick={() => setSelectedSong(song)}

                className={`cursor-pointer p-6 md:p-8 bg-white/5 border transition-all duration-300
                ${
                  selectedSong.id === song.id
                  ? "border-premium-rosegold bg-white/10"
                  : "border-white/10 hover:bg-white/10"
                }`}

              >



                <div className="flex items-start gap-4">


                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-premium-rosegold to-premium-gold flex items-center justify-center">

                    <Music className="w-5 h-5 text-white"/>

                  </div>




                  <div>


                    <h3 className="font-serif text-2xl text-white">

                      {song.name}

                    </h3>



                    <p className="text-premium-gold uppercase text-sm mb-4">

                      {song.artist}

                    </p>



                    <div className="h-px w-12 bg-premium-rosegold/40 mb-4"/>



                    <p className="text-slate-300 italic border-l-2 border-premium-rosegold/30 pl-4">

                      "{song.memory}"

                    </p>



                  </div>


                </div>


              </GlassCard>


            </motion.div>


          ))}


        </motion.div>



      </div>


    </SectionWrapper>

  );
}