import { Link,  useNavigate } from "react-router-dom"
import Button from "./atoms/Button";
import { SiZedindustries } from "react-icons/si";
import { useEffect, useState } from "react";
import { GrObjectGroup } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { HiOutlineLogin } from "react-icons/hi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../store/authSlice";
import { RootState } from "../store/store";
import { User } from "../helpers/types";



const menuItems = [
    { icon: <BsFileEarmarkPdfFill />, text: 'Build Resume', href:'/resume'},
    { icon: <FaGraduationCap />, text: 'Interview Prep', href: '/interview' },
];

const Header = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData:User |null = useSelector((state:RootState)=>state.auth.data) ;

    const [menuOpen, setmenuOpen] = useState<boolean>(false)
    const [profileOpen, setProfileOpen] = useState<boolean>(false)
    const signedIn = true;

    const {scrollY} = useScroll();
    const [scrollDirn,setScrollDirn] = useState('up');

     useMotionValueEvent(scrollY,"change",(current)=>{

        //@ts-ignore
        const diff = current - scrollY.getPrevious();

        setScrollDirn(diff>0 ? 'down' :'up')
    })

    const list = {
        hidden: {
            opacity: 0,
            transition: { when: 'afterChildren', staggerChildren: 0.2 }
        },
        show: {
            opacity: 1,
            transition: { when: 'beforeChildren', staggerChildren: 0.2 }
        },
    }
    const item = {
        hidden: { opacity: 0, y: -10 },
        show: { opacity: 1, y: 0 }
    }

    const isuser = async()=>{
        
        try {

            if(!userData){
                const { data } = await axios.get('/v1/user/get');
                dispatch(signin(data.user));
                if (!data.success) {
                    navigate('/auth')
                }
            }
            else{
                console.log('already verified',userData)
            }
        } catch (error) {
            navigate('/auth')
        }
    }

    useEffect(()=>{
        isuser();
    }, [navigate]);

    return (
        <header className="z-50 w-full sticky top-0 h-16 md:h-18 px-2">
            <motion.nav
                style={{translateY:scrollDirn == "down"?-100:20}}
            className="transition-all duration-500 px-6 w-full mx-auto mt-4 rounded-full md:w-[80%] h-full flex items-center justify-between bg-[#ffffff]/10 backdrop-blur-md">
                <Link to='/'>
                    <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain " />
                </Link>

                <motion.div
                    layout
                    transition={{
                        type: 'spring',
                        visualDuration: 0.5,
                        bounce: 0.5
                    }}
                    className="flex gap-2 relative items-center">
                    {signedIn && (
                        <>
                        <Link to='/dashboard'>
                            <Button
                                transition={{
                                    type: 'spring',
                                    visualDuration: 0.5,
                                    bounce: 0.5
                                }} containerClass="bg-white/80 hover:bg-white" title='Industry Insight' leftIcon={<SiZedindustries />} titleClass="hidden md:block tracking-tight" />
                        </Link>

                                
                            {!menuOpen ? <Button transition={{
                                type: 'spring',
                                visualDuration: 3,
                                bounce: 0.5
                            }} onClick={() => setmenuOpen(true)} title='Growth Tool' leftIcon={<GrObjectGroup className="h-4 w-4" />} rightIcon={<IoIosArrowDown />} titleClass="hidden md:block" containerClass="text-black bg-white/80 hover:bg-white tracking-tight" /> : (
                                    <motion.ul variants={list} initial="hidden" animate="show" exit="hidden"
                                        className="translate-y-[90px] relative bg-white/30 text-white/70 py-2  backdrop-blur-md rounded-md flex flex-col gap-2">
                                    <p className=" absolute -top-2 -right-1 bg-white/50 px-1.5 rounded-full text-sm cursor-pointer" onClick={() => setmenuOpen(false)}>X</p>
                                    {menuItems.map((items, indx) => (
                                        <motion.li key={indx} variants={item} className="text-white/80 cursor-pointer px-4 md:px-6 hover:bg-white/50 rounded-full transition-colors duration-500 flex text-sm items-center  gap-1 tracking-tight md:text-[15px] py-1"><Link to={items.href}>{items.icon}{items.text}</Link></motion.li>
                                    ))}
                                </motion.ul>
                            )}
                            
                        </>
                    )}


                    

                    {signedIn ? (<motion.button layout onClick={() => setProfileOpen(!profileOpen)} className="w-8 h-8 rounded-full">
                        <motion.img layout src="/avatar-1.png" alt="" />
                    </motion.button>) : (
                        <Button title='Login' titleClass="text-white/70 text-[12px] md:text-[17px]" rightIcon={<HiOutlineLogin className="text-[15px] text-white/70 hidden md:block" />} containerClass="bg-white/10 hover:bg-white/30" />
                    )}
                </motion.div>
            </motion.nav>
            <AnimatePresence>
                {profileOpen && (

                    <div className="absolute right-8 top-21">

                        <motion.ul variants={list} initial="hidden" animate="show" exit="hidden" className="bg-white/30 text-white/70 rounded-lg py-2 shadow-amber-100/20 shadow-md backdrop-blur-md">
                            <motion.li variants={item} className="hover-li">Profile</motion.li>
                            <motion.li variants={item} className="hover-li">setting</motion.li>
                            <motion.li variants={item} className="hover-li">Logout</motion.li>
                        </motion.ul>

                    </div>

                )}
            </AnimatePresence>
        </header>
    )
}

export default Header