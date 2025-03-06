import { FC, ReactNode } from "react"
import { motion } from 'motion/react'

interface props{
    containerClass?:string;
    title:String;
    titleClass?:string;
    leftIcon?:ReactNode;
    rightIcon?: ReactNode;
    transition ?:{};
    type?:"button" | "submit"

    onClick?:()=>void
}

const Button: FC<props> = ({ containerClass, title, leftIcon, rightIcon, titleClass ,onClick,transition,type}) => {
  return (
    <motion.button type={type} layout transition={transition} onClick={onClick} className={`${containerClass} btn`}>
        {leftIcon}
          <span className={titleClass}>{title}</span>
        {rightIcon}
    </motion.button>
  )
}

export default Button