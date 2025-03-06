import { useState } from "react"
import AuthAmination from "../../components/AuthAmination"
import SignUpForm from "../../forms/SignUpForm"
import {AnimatePresence, motion} from 'motion/react'
import LoginForm from "../../forms/LoginForm"

const AuthPage = () => {

  const [loginPage,setLoginPage] = useState<boolean>(false);
  const [loginForm,setLoginForm] = useState<number>(-300);
  const [signupForm, setSignupForm] = useState<number>(-50);

  const switchForms = ()=>{

    if(loginPage){
      setLoginPage(false);
      setLoginForm(-300);
      setSignupForm(-50);
    }
    else{
      setLoginPage(true);
      setLoginForm(-50);
      setSignupForm(200);
    }
  }
  return (
    <section className="w-full h-dvh relative overflow-clip">

      {/* Rain */}
      <AuthAmination />
      <div className="absolute top-0 left-0 bottom-0 right-0">
        <img src="/banner.jpeg" alt="Background Image"  className="w-full h-full object-cover"/>
      </div>

      <div 
      className="relative w-full h-full z-20">
        
        {/* Login Form */}
        <motion.div
        animate={{
              translateX: `${loginForm}%`,
          }} 
          transition={{type:"spring",bounce:0.25,visualDuration:1,stiffness:200}}
        className=" absolute w-[90%]  sm:w-sm  pb-8 pt-4 top-1/4 left-1/2 bg-white/20  rounded-lg backdrop-blur-md flex flex-col items-center border-[1px] border-white/40 transition-all duration-500">
          <SignUpForm switchForm={switchForms}/>
        </motion.div>

        {/* SignUp Form */}
        <motion.div 
            animate={{
              translateX: `${signupForm}%`,
            }} 
          transition={{ type: "spring", bounce: 0.25, visualDuration: 1 ,stiffness:200}}
            className=" absolute w-[90%]  sm:w-sm  pb-8 pt-4 top-1/4 left-1/2  bg-white/20 rounded-lg backdrop-blur-md flex flex-col items-center border-[1px] border-white/40  transition-all duration-500">
          <LoginForm switchForm={switchForms}/>
        </motion.div>
    
      </div>
    </section>
  )
}

export default AuthPage