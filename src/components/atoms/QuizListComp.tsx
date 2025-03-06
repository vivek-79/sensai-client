import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import QuizResult from "../QuizResult";

interface Data{
    category:string;
    id:number;
    improvmentTip:string;
    questions:[][];
    quizScore:number;

    updatedAt:string;
    userId:string;
}

const QuizListComp = ({data,id}:{data:Data | null,id:number}) => {

    if(data == null ){
        return;
    }

    const [show,setShow] = useState<boolean>(false)
  return (
    <button onClick={()=>setShow(true)} className="w-full cursor-pointer relative flex flex-col items-start border-[1px] border-white/40 rounded-md p-2 mt-4 ">

        {show && (
              <span className="absolute z-10 overflow-auto bg-white/30 backdrop-blur-md w-full h-96 max-w-[550px] left-1/2 top-1/2 right-0 bottom-0 -translate-y-1/2 -translate-x-1/2 border-[1px] border-white/50 rounded-md">
                  <span  onClick={(e)=> {
                    e.stopPropagation();
                    setShow(false)
                  }} className="z-20 cursor-pointer sticky w-full top-2"><MdOutlineCancel className="absolute right-2 bg-white text-4xl text-black rounded-full" /></span>
                <span>
                      <QuizResult result={data.improvmentTip} answers={data.questions[1]} quizedata={data.questions[0]} hideStartNew={true} score={data.quizScore} onStartNew={() => { }} />
                </span>
            </span>
        )}
        <span className="text-white/70 font-semibold text-lg">Quiz {id}</span>
        <span className="text-white/60">Score {data.quizScore*10}%</span>
        <span className="w-full text-left">
            <span className="text-white/50">Improvment Tip: </span>
            <span className="text-white/40 text-xs text-left">Score {data.improvmentTip}%</span>
        </span>

    </button>
  )
}

export default QuizListComp