import { ReactNode } from "react";
import { LuBrainCircuit } from "react-icons/lu";
import { FiBriefcase } from "react-icons/fi";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsFilePdf } from "react-icons/bs";

interface Feature{
    icon: ReactNode;
    title:string;
    description:string;
}
export const features:Feature[] = [
    {
        icon: <LuBrainCircuit  className='text-2xl'/>,
        title: "AI-Powered Career Guidance",
        description:
            "Get personalized career advice and insights powered by advanced AI technology.",
    },
    {
        icon: <FiBriefcase  className='text-2xl'/>,
        title: "Interview Preparation",
        description:
            "Practice with role-specific questions and get instant feedback to improve your performance.",
    },
    {
        icon: <BsGraphUpArrow  className='text-2xl'/>,
        title: "Industry Insights",
        description:
            "Stay ahead with real-time industry trends, salary data, and market analysis.",
    },
    {
        icon: <BsFilePdf  className='text-2xl'/>,
        title: "Smart Resume Creation",
        description: "Generate ATS-optimized resumes with AI assistance.",
    },
];


const Features = () => {
  return (
    <div className="w-full">
        <h2 className="pt-18 text-white text-center text-4xl md:text-5xl font-bold">Powerful Features for <br/>Your Carrer Growth</h2>

        <div className="flex items-center justify-center text-white flex-wrap gap-4 py-14 px-4 md:px-6">
            {features.map((item,indx)=>(
                <div className=" hover:bg-white/10 hover:scale-3d hover:scale-105 transition-all duration-500 md:w-1/5 md:min-w-64 w-full flex flex-col items-center justify-start gap-3 text-center border-[1px] border-white/50 rounded-md p-4 md:min-h-48 shadow-md shadow-white/30" key={indx}>
                    <p>{item.icon}</p>
                    <p className="text-xl font-medium">{item.title}</p>
                    <p className="text-base leading-4 font-light text-white/50">{item.description}</p>
                </div>
            ))}
        </div>

        <div className="w-full h-42 bg-[#1d1c1c] flex items-center justify-around py-4">
            <p className="flex flex-col items-center"><span className="md:text-3xl text-2xl text-white font-medium ">50+</span><span className="text-xs tracking-tight text-white/40 md:text-sm">Industries Covered</span></p>
            <p className="flex flex-col items-center"><span className="md:text-3xl text-2xl text-white font-medium ">1000+</span><span className="text-xs tracking-tight text-white/40 md:text-sm">Interview Questions</span></p>
            <p className="flex flex-col items-center"><span className="md:text-3xl text-2xl text-white font-medium ">95%</span><span className="text-xs tracking-tight text-white/40 md:text-sm">Success Rate</span></p>
            <p className="flex flex-col items-center"><span className="md:text-3xl text-2xl text-white font-medium ">24/7</span><span className="text-xs tracking-tight text-white/40 md:text-sm">AI Support</span></p>
        </div>
    </div>
  )
}

export default Features