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

    <SectionWrapper

      id="polaroids"

      className="
        py-32 
        relative 
        overflow-hidden 
        bg-gradient-to-b 
        from-white/10 
        to-premium-pink/20
      "

    >




      {/* Heading */}

      <div className="text-center mb-16 relative z-10">


        <motion.h2

          initial={{
            opacity:0,
            y:20
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:1
          }}

          className="
            font-serif 
            text-4xl 
            md:text-5xl 
            lg:text-6xl 
            text-premium-rosegold 
            mb-6
          "

        >

          Polaroid Memories

        </motion.h2>




        <motion.p

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          viewport={{
            once:true
          }}

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

          Some moments are too beautiful to forget. Click them to relive the memories.

        </motion.p>


      </div>







      {/* Polaroid Container */}


      <div

        ref={containerRef}

        className="
          w-full 
          max-w-7xl 
          mx-auto 
          px-4 
          min-h-[600px]
          relative 
          flex 
          flex-wrap 
          justify-center 
          items-center 
          gap-8 
          md:gap-12 
          z-10
        "

      >



        {POLAROIDS.map((item)=>(


          <motion.div


            key={item.id}


            drag


            dragConstraints={containerRef}


            dragElastic={0.25}



            whileHover={{

              scale:1.05,

              zIndex:30

            }}



            whileDrag={{

              scale:1.1,

              zIndex:40,

              rotate:0

            }}




            initial={{

              opacity:0,

              scale:0.5,

              rotate:item.rotation - 15

            }}



            whileInView={{

              opacity:1,

              scale:1,

              rotate:item.rotation

            }}



            viewport={{

              once:true,

              margin:"-10%"

            }}



            transition={{

              type:"spring",

              stiffness:200,

              damping:20

            }}




            onClick={()=>setSelectedImage(item)}



            className="
              relative
              w-64 
              md:w-72 
              bg-[#fcfcfc] 
              p-4 
              pb-12 
              md:pb-16 
              rounded-sm 
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              cursor-pointer
              border 
              border-gray-100
            "


          >



            <div

              className="
                w-full 
                bg-gray-200 
                overflow-hidden 
                rounded-sm 
                border 
                border-black/5 
                shadow-inner 
                flex 
                items-center 
                justify-center
              "

            >



              <img

                src={item.image}

                alt={item.caption}

                className="
                  w-full 
                  h-auto 
                  max-h-[400px]
                  object-contain
                  grayscale-[20%]
                  sepia-[10%]
                  contrast-110
                "

                draggable={false}

                loading="lazy"

              />


            </div>





            <div

              className="
                absolute 
                bottom-4 
                left-0 
                w-full 
                px-4 
                flex 
                flex-col 
                items-center
                pointer-events-none
              "

            >


              <span

                className="
                  font-handwriting 
                  text-2xl 
                  md:text-3xl 
                  text-slate-700 
                  text-center
                "

              >

                {item.caption}

              </span>


            </div>



          </motion.div>


        ))}



      </div>








      {/* MODAL */}


      {typeof document !== "undefined" &&

        createPortal(


          <AnimatePresence>


            {selectedImage && (


              <motion.div


                initial={{
                  opacity:0
                }}


                animate={{
                  opacity:1
                }}


                exit={{
                  opacity:0
                }}



                onClick={()=>setSelectedImage(null)}



                className="
                  fixed 
                  inset-0 
                  z-[100]
                  flex 
                  items-center 
                  justify-center
                  p-4
                  bg-black/60
                  backdrop-blur-md
                "


              >




                <motion.div



                  initial={{

                    scale:0.8,

                    opacity:0

                  }}



                  animate={{

                    scale:1,

                    opacity:1

                  }}



                  exit={{

                    scale:0.8,

                    opacity:0

                  }}



                  transition={{

                    type:"spring",

                    bounce:0.3

                  }}



                  onClick={(e)=>e.stopPropagation()}



                  className="
                    relative
                    bg-[#fcfcfc]
                    p-6
                    pb-20
                    rounded-sm
                    shadow-2xl
                    max-w-2xl
                    w-full
                  "



                >



                  <button


                    onClick={()=>setSelectedImage(null)}


                    className="
                      absolute
                      -top-4
                      -right-4
                      w-10
                      h-10
                      rounded-full
                      bg-white
                      shadow-lg
                      flex
                      items-center
                      justify-center
                    "


                  >

                    <X className="w-5 h-5"/>


                  </button>






                  <img


                    src={selectedImage.image}


                    alt={selectedImage.caption}


                    className="
                      w-full
                      max-h-[70vh]
                      object-contain
                    "


                  />






                  <div

                    className="
                      absolute
                      bottom-6
                      left-0
                      w-full
                      text-center
                    "

                  >

                    <span

                      className="
                        font-handwriting
                        text-4xl
                        text-slate-700
                      "

                    >

                      {selectedImage.caption}

                    </span>


                  </div>




                </motion.div>



              </motion.div>



            )}


          </AnimatePresence>,


          document.body

        )

      }



    </SectionWrapper>

  );

}