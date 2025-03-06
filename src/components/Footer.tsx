import { FaArrowRight } from "react-icons/fa"
import {motion} from 'motion/react'


const Footer = () => {
  return (
    <footer className="w-full flex flex-col">
      <div className="text-center py-10 w-full items-center flex flex-col bg-gradient-to-b from-[#98c8d7] from-0% via-[#e9dfdff9] via-45% to-[#98c8d7] to-100%">
        <p className="text-4xl md:text-5xl font-bold text-black">Ready to Accelarete Your Carrer ?</p>
        <p className="w-full max-w-md mx-auto mt-4 text-black/70">Join thousands of professionals who are advancing their 
          carrers with AI-powered guidance.
        </p>
        <motion.button 
        animate={{
          y:-15,
        }}
        transition={{
          visualDuration:1,
          bounce:0.25,
          type:"spring",
          repeat:Infinity,
          repeatType:'mirror',
        }}
        className="btn mt-10 flex items-center justify-center bg-black text-white w-fit hover:text-black hover:bg-white transition-colors duration-500"
        >Start Your Journey Today<FaArrowRight />
        </motion.button>
      </div>
      <div></div>
    </footer>
  )
}

export default Footer