import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapper } from '../layout/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { TIMELINE_EVENTS } from '../../data/timeline';


export function Timeline() {

  const containerRef = useRef<HTMLDivElement>(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });


  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );


  return (

    <SectionWrapper 
      id="our-story" 
      className="py-32 relative overflow-hidden"
    >


      {/* Background Glow */}

      <div className="
        absolute 
        top-1/4 
        right-0 
        w-[600px] 
        h-[600px] 
        bg-premium-rosegold/10 
        blur-[150px] 
        rounded-full 
        pointer-events-none
      "/>



      {/* Heading */}

      <div className="text-center mb-24 relative z-10">


        <motion.h2

          initial={{opacity:0,y:20}}

          whileInView={{opacity:1,y:0}}

          viewport={{once:true}}

          transition={{duration:1}}

          className="
            font-serif 
            text-4xl 
            md:text-5xl 
            lg:text-6xl 
            text-premium-rosegold 
            mb-6
          "

        >

          Our Story

        </motion.h2>



        <motion.p

          initial={{opacity:0}}

          whileInView={{opacity:1}}

          viewport={{once:true}}

          transition={{
            duration:1,
            delay:0.3
          }}

          className="
            text-lg 
            md:text-xl 
            text-slate-600 
            font-light 
            max-w-2xl 
            mx-auto 
            px-4
          "

        >

          Every great journey begins with a single step. 
          Here is a look back at the beautiful chapters we've written together.

        </motion.p>


      </div>





      {/* Timeline */}

      <div 
        ref={containerRef}
        className="
          relative 
          w-full 
          max-w-5xl 
          mx-auto 
          px-4 
          sm:px-8 
          z-10
        "
      >



        {/* Base Line */}

        <div

          className="
            absolute 
            left-8 
            md:left-1/2 
            top-0 
            bottom-0 
            w-1 
            bg-white/40 
            shadow-inner 
            -translate-x-1/2 
            rounded-full
          "

        />




        {/* Animated Line */}

        <motion.div

          className="
            absolute 
            left-8 
            md:left-1/2 
            top-0 
            w-1 
            bg-gradient-to-b 
            from-premium-rosegold 
            to-premium-gold 
            -translate-x-1/2 
            rounded-full 
            origin-top
          "

          style={{
            height: lineHeight
          }}

        />





        <div className="
          flex 
          flex-col 
          gap-16 
          md:gap-24 
          py-10
        ">



          {TIMELINE_EVENTS.map((event,index)=>{


            const isEven = index % 2 === 0;



            return (

              <div

                key={event.id}

                className="
                  relative 
                  flex 
                  items-center 
                  justify-between 
                  w-full 
                  group
                "

              >



                {/* Dot */}

                <div

                  className="
                    absolute 
                    left-8 
                    md:left-1/2 
                    w-5 
                    h-5 
                    rounded-full 
                    bg-premium-gold 
                    shadow-[0_0_15px_rgba(212,175,55,0.8)]
                    -translate-x-1/2 
                    z-10 
                    transition-all 
                    duration-500 
                    group-hover:scale-150 
                    group-hover:bg-premium-rosegold 
                    border-2 
                    border-white
                  "

                />





                {/* Card */}

                <motion.div


                  initial={{
                    opacity:0,
                    x:isEven ? -50 : 50,
                    y:30
                  }}


                  whileInView={{
                    opacity:1,
                    x:0,
                    y:0
                  }}


                  viewport={{
                    once:true,
                    margin:"-15%"
                  }}


                  transition={{
                    duration:0.8,
                    type:"spring",
                    bounce:0.3
                  }}



                  className={`
                    w-full 
                    md:w-5/12 
                    pl-16 
                    md:pl-0
                    ${
                      isEven
                      ?
                      "md:pr-16 md:text-right"
                      :
                      "md:ml-auto md:pl-16 md:text-left"
                    }
                  `}

                >



                  <GlassCard

                    className={`
                      p-6 
                      md:p-8 
                      hover:-translate-y-2 
                      transition-transform 
                      duration-500 
                      border-white/50
                      flex 
                      flex-col
                      ${
                        isEven
                        ?
                        "md:items-end"
                        :
                        "md:items-start"
                      }
                    `}

                  >




                    {/* Date */}

                    <span

                      className="
                        inline-block 
                        px-4 
                        py-1 
                        rounded-full 
                        bg-premium-pink 
                        text-premium-rosegold 
                        text-sm 
                        font-semibold 
                        tracking-wider 
                        mb-4 
                        border 
                        border-premium-rosegold/20
                      "

                    >

                      {event.date}

                    </span>




                    {/* Title */}

                    <h3

                      className="
                        font-serif 
                        text-2xl 
                        font-bold 
                        text-premium-dark 
                        mb-3
                      "

                    >

                      {event.title}

                    </h3>





                    {/* Description */}

                    <p

                      className={`
                        text-slate-600 
                        font-light 
                        leading-relaxed
                        ${
                          isEven
                          ?
                          "md:text-right text-left"
                          :
                          "text-left"
                        }
                      `}

                    >

                      {event.description}

                    </p>




                  </GlassCard>


                </motion.div>



              </div>

            );


          })}



        </div>


      </div>


    </SectionWrapper>

  );

}