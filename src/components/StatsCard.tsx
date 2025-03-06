import Card from "./atoms/Card";


const StatsCard = ({data}:{data:[] | null}) => {

  if(data==null){
    return;
  };


  //@ts-ignore
  const totalScore = ((data.reduce((acc,cur)=>(acc+cur?.quizScore),0)/data.length)*10).toFixed(1)
  const totalQuestions = data.reduce((acc,cur)=>{

    //@ts-ignore
    if(!Array.isArray(cur.questions)) return acc;

    //@ts-ignore
    const innerSum = cur?.questions[1]?.reduce((next, present) => {
       return present === null ? next : next + 1
  }, 0);

  return acc+ innerSum;
  },0)

  //@ts-ignore
  const lastScore =data[data.length-1]?.quizScore*10;


  return (
    <div className="w-full flex flex-row gap-4 py-4">
      <Card title="Average Score" info={`${totalScore || 0}%`} subtitle="Across all quizes"/>
      <Card title="Questions Practiced" info={`${totalQuestions ||0}`} subtitle="Total Questions"/>
      <Card title="Latest Score" info={`${lastScore}%`} subtitle="Most recent quiz"/>
    </div>
  )
}

export default StatsCard