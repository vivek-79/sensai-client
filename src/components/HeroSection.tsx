

import { useRef } from "react";
import Button from "../components/atoms/Button"
import { useScroll, useTransform, motion } from 'motion/react'




const HeroSection = () => {


    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["end end", "center end"]
    });

    const rotateX = useTransform(scrollYProgress,
        [0, 1],
        [0, -40],
    )

    return (
        <section className="relative" ref={sectionRef}>
            <div className="w-full">

                <div className="w-full bg-gradient-to-b from-[#ffffffc6] from-70% to-[#2b2929b7] text-transparent bg-clip-text text-center mt-28 text-4xl md:text-7xl font-bold tracking-tight">
                    <h2>Your AI Carrer Coach for</h2>
                    <h2>Professional Success</h2>
                </div>

                <div className="flex flex-col">
                    <p className="text-white mx-auto max-w-md w-[80%] mt-6 text-center text-sm">Advance your career with personalized guidance,Interview
                        prep, and AI-powered tools for job sucess.
                    </p>

                    <div className="flex items-center justify-center gap-8 mt-8">
                        <Button title="Get Started" containerClass="bg-white hover:bg-white/70" />
                        <Button title="Watch Demo" containerClass="text-white border-[1px] hover:bg-white/20" />
                    </div>
                </div>

                <motion.div
                    style={{ rotateX: rotateX, transformStyle: "preserve-3d" }}
                    className="mt-6 relative [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
                    <img src="/banner.jpeg" alt="Banner" />
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection