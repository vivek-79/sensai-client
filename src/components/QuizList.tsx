import QuizListComp from "./atoms/QuizListComp";

const QuizList = ({data}:{data:[] | null}) => {

  if(data===null){
    return;
  }
  return (
    <div className="py-4">
      <h2 className=" mt-4 text-2xl md:text-3xl text-white/70 font-semibold">Recent Quizes</h2>
      <p className="text-white/40">Review your past quiz performances</p>

      <div className="w-full">
      {data && data.map((item,indx)=>(
        <QuizListComp key={indx} id={indx+1} data={item}/>
      ))}
      </div>
    </div>
  )
}

export default QuizList