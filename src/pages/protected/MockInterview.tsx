import { FaArrowLeft } from "react-icons/fa6"
import { Link } from "react-router-dom"
import Quiz from "../../components/Quiz"


const MockInterview = () => {
  return (
    <div className="w-full mt-8 ">
          
          <div className="w-full">
              <Link to='/interview' className="fade flex items-center"><FaArrowLeft className="mr-2" /><span className="underline">Back to Interview Preparation</span></Link>
              <h2 className="heading ">Mock Interview</h2>
              <p className="text-white/40 -mt-1 text-sm">Test your knowledge with industry-specific questions</p>
          </div>
        <Quiz/>
    </div>
  )
}

export default MockInterview