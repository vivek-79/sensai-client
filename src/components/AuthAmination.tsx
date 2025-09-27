import { useEffect, useState } from "react"
import { motion } from 'motion/react'

interface Drops {
    id: number;
    x: number;
}

const AuthAmination = () => {

    const [drops, setDrops] = useState<Drops[]>([]);

    useEffect(() => {

        const interval = setInterval(() => {

            setDrops((prevDrop) => [
                ...prevDrop,
                { id: Date.now(), x: Math.floor(1 + Math.random() * 100) },
            ])

            setTimeout(() => {
                setDrops((prevDrops) => prevDrops.slice(1));
            }, 5000);
        }, 200)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {drops.map((drop) => (
                <motion.div key={drop.id}
                    className="absolute z-50 w-6 h-6 bg-[radial-gradient(ellipse at center, #FFFFFF 10%, #B7E3FF 30%, rgba(183, 227, 255, 0.4) 60%, rgba(183, 227, 255, 0) 100%)] backdrop-blur-3xl rounded-full"

                    initial={{y:-300}}
                    animate={{y:"100vh"}}
                    transition={{duration:5,ease:"linear"}}
                    style={{left:`${drop.x}%`}}
                />
            ))}</>
    )
}

export default AuthAmination