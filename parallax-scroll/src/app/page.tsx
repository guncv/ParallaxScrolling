"use client"
import Image from 'next/image'
import styles from "@/app/page.module.css"
import {useTransform, useScroll, motion} from "framer-motion"
import {useEffect, useRef} from "react"
import Lenis from '@studio-freight/lenis'
import useDimension from "../useDimension"

const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  "image9.jpg",
  "image10.jpg",
  "image11.jpg",
  "image12.jpg"
]
 
export default function Home() {
  const container = useRef(null);
  const {height} = useDimension()
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start end','end start']
  })
  const y = useTransform(scrollYProgress,[0,1],[0,2000])

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={container} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y}/>
        <Column images={[images[3], images[4], images[5]]}/>
        <Column images={[images[6], images[7], images[8]]}/>
        <Column images={[images[9], images[10], images[11]]}/>
      </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({images, y=0}) => {
  return (
    <motion.div style={{y}} className={styles.column}>
      {
        images.map( (src,index) =>{
          return <div key={index} className={styles.imageContainer}>
            <Image src={`/img/${src}`}
              fill 
              alt="Failed To Load Image"/>
            </div>
        })
      }
    </motion.div>
  )
}