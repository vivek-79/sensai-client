import { RxCrossCircled } from "react-icons/rx";
import { CiCircleCheck } from "react-icons/ci";
import Button from "./atoms/Button";

interface Props {

  result:string;
  hideStartNew:boolean;
  onStartNew:()=>void;
  answers:number[];
  quizedata:any;
  score: number;
}

interface DisplayData{
  answers:string;
  correctAnswer:string;
  userAnswer:string | null;
  explanation:string;
  question:string;

};
const QuizResult = ({ result, hideStartNew = false, onStartNew, answers, quizedata, score }:Props) => {
  
  
  const displayData: DisplayData[] = quizedata.map((item:any,indx:number)=>({
    question:item.question,
    correctAnswer:item.correctAnswer,
    userAnswer:item.options[answers[indx]] || null,
    explanation:item.explanation,
  }));


    if(!result){
        return null;
    }

    console.log(score)
    const percentage = (score/10)*100;
    
    return (
    <div className="w-full flex flex-col gap-5">

      {/* Top Bar */}
      <div>
          <p className="text-4xl text-left">🏆 <span className="text-xl font-bold text-white/70">Quiz Results</span></p>
          <p className="text-center text-xl font-medium">{percentage.toFixed(1)}%</p>
      </div>
      <div className="w-full h-2 bg-white/30 mb-4 relative rounded-md overflow-hidden">
          <div className="absolute h-full w-full bg-white origin-left rounded-md" style={{ scale:`${percentage}%`}}></div>
      </div>

      {displayData && displayData.map((item,indx)=>(
        <div className="flex flex-col bg-white/20 p-2 rounded-md" key={indx}>
          <p className="text-white/80 text-lg font-semibold text-left">{indx+1}. {item.question}</p>
          <p className="mt-4 fade text-left">Correct Answer: <span>{item.correctAnswer}</span></p>
          <p className={`text-sm fade mt-2 flex items-center relative font-medium p-1 rounded-md pr-6 ${item.correctAnswer === item.userAnswer ? 'bg-green-700' : 'bg-red-700 '}`}>Your Answer: <span className="ml-2">{item.userAnswer}</span> {item.correctAnswer === item.userAnswer ? <CiCircleCheck className="absolute right-2 font-medium text-xl" /> : <RxCrossCircled className="absolute right-2 font-medium text-xl" />} </p>
          <p className="mt-4 bg-white/20 p-2 rounded-lg font-medium flex gap-2 leading-5 text-left"><span>Explanation:</span> <span className="fade font-mono">{item.explanation}</span></p>
        </div>
      ))}

        <div className="w-full flex flex-col">
          <p className="text-center font-medium text-xl w-full bg-amber-200/65 rounded-md py-1">💡 Suggestion 💡 </p>
          <p className="py-2 text-base leading-5 text-left">{result}</p>
          {!hideStartNew && <Button onClick={() => onStartNew()} title='Start New' containerClass=" bg-white/60 text-black hover:bg-white/80 mt-4 font-semibold" /> }
      </div>
    </div>
  )
}

export default QuizResult