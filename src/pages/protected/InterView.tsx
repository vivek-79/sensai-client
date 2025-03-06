import { useEffect, useState } from "react"
import PerformanceChart from "../../components/PerformanceChart"
import QuizList from "../../components/QuizList"
import StatsCard from "../../components/StatsCard"
import { useFetch } from "../../services/useFetch"
import { Link } from "react-router-dom"

const InterView = () => {


  
  const [server,setServer] =useState<{api:string,method:""|"get"|"post"}>({api:'',method:''});
  const { response } = useFetch({ api: server.api, method: server.method });
  const [data,setData] = useState<[]|null>([]);

  useEffect(()=>{
    if(!data?.length){
      setServer({ api:'/v1/interview/getAllAssessments',method:'post'});
      setData(response?.data)
    }
    else{
      setServer({api:'',method:''});
    }
  },[response])

  console.log(data)
  return (
    <section>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="heading">Interview Preparation</h1>
          <Link className="btn bg-white/70 hover:bg-white" to="/interview/mock">Start New</Link>
        </div>

        <div>
          <StatsCard data={data}/>
          <PerformanceChart data={data}/>
          <QuizList data={data}/>
        </div>
      </div>
    </section>
  )
}

export default InterView