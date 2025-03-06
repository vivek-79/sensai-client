import { useEffect, useRef, useState } from "react"
import { useFetch } from "../services/useFetch";
import Button from "./atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAnswers, removeQuizeData, saveQuizedata } from "../store/quizSlice";
import { RootState } from "../store/store";
import axios from "axios";
import QuizResult from "./QuizResult";


const Quiz = () => {

  const dispatch = useDispatch();
  const storedQuizeData = useSelector((state: RootState) => state.quiz.quizData);
  const answers = useSelector((state: RootState) => state?.quiz?.answers);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [resultData,setResultData] = useState('');
  

  const scoreRef= useRef(0)


  const [server, setServer] = useState<{ api: string; method: "" | "get" | "post" }>({ api: '', method: "" })
  const { loading, error, response: quizData } = useFetch({ api: server.api, method: server.method });
  const quizeData = storedQuizeData.length > 0 ? storedQuizeData : quizData?.result?.questions || []


  //new quize start
  const startQuiz = () => {
    dispatch(removeQuizeData());
    setCurrentQuestion(0);
    setShowSubmitConfirmation(false);
    scoreRef.current=0;
    setResultData('')
    setServer({ api: '/v1/interview/get', method: "get" });
  };


  useEffect(() => {
    if (quizData?.result?.questions && storedQuizeData.length === 0) {

      dispatch(saveQuizedata(quizData.result.questions));
      setServer({ api: '', method: '' })
    }
  }, [quizData, dispatch, storedQuizeData.length])


  if (loading) {

    return (
      <div className="w-full min-h-80 flex flex-col items-center justify-center">
        <p className="fade">Loading ...</p>
      </div>
    )
  }

  if (!quizeData || quizeData.length === 0) {
    return (
      <div className="w-full min-h-80 flex flex-col items-center justify-center">

        <p className="text-white w-full max-w-md text-center fade">
          This quiz contains 10 questions specific to your industry and skills.
          Take your time and choose the best answer for each question.
        </p>
        <Button onClick={startQuiz} title='Start Quiz' containerClass="bg-white text-black mt-4 hover:bg-white/80" />

      </div>
    )
  }

  const question = quizeData[currentQuestion];

  //submitting each question

  const handleSubmitQuestion = (indx: number) => {

    dispatch(addAnswers({ index: currentQuestion, answer: indx }))
  }

  //cancel-submit

  const cancelSubmit = () => {
    setShowSubmitConfirmation(false)
  }


  //submit- quize

 
  const handleSubmitQuiz =async() => {
   
    const wrongAnswers: string[] = [];
    const wrongAsnweredQuestion: string[] = [];
    const correctAnswer: string[] = [];

    for (let i=0; i<10;i++){

      if (quizeData[i].options.indexOf(quizeData[i].correctAnswer)===answers[i]){

        scoreRef.current +=1;
      }
      else{
        wrongAnswers.push(quizeData[i].options[answers[i] || 0]);
        correctAnswer.push(quizeData[i].correctAnswer);
        wrongAsnweredQuestion.push(quizeData[i].question)
      }
    }

    const info = {
      questions:quizeData,
      score:(scoreRef.current).toFixed(1),
      wrongAnswers,
      correctAnswer,
      wrongAsnweredQuestion,
      answers,
    }
     
  try {
    
    const { data } = await axios.post('/v1/interview/submit', info)
    if(data.success){
      setResultData(data.message)
    }
  } catch (error) {
    console.log(error);
  }
    
  }

  //result after quiz
  if(resultData){

    return(
      <div className="quiz-div">
        <QuizResult result={resultData}  hideStartNew={false} onStartNew={startQuiz} answers={answers} quizedata={quizeData} score={scoreRef.current}/>
      </div>
    )
  }
  return (
    <div className="quiz-div">

      {showSubmitConfirmation && (
        <div className="w-64 h-48 flex flex-col justify-center bg-white/30 backdrop-blur-md absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md border-[1px] border-white/40 p-2">
          <p className="fade text-center">By Clicking on <span className="text-white">Confirm</span> Quiz will be submitted.</p>
          <div className="w-full flex items-center mt-4 justify-around">
            <Button title="Confirm" onClick={handleSubmitQuiz} containerClass="text-black bg-white font-medium hover:bg-white/70" />
            <Button title="Back" onClick={cancelSubmit} containerClass="bg-black text-white font-medium hover:bg-black/50" />
          </div>
        </div>
      )}

      <h3 className="fade">Question {currentQuestion + 1} of 10</h3>
      <p className="font-medium mt-2 text-lg">{question?.question}</p>

      <div className="mt-4">
        {question && question.options.map((option: string, indx: number) => (
          <div className="flex mt-1 fade gap-2 items-center" key={indx}>
            <input type="radio" checked={answers[currentQuestion] == indx} onChange={() => handleSubmitQuestion(indx)} name={`quiz-${currentQuestion}`} className="w-3 h-3" />
            <p>{option}</p>
          </div>
        ))}
        <details className="mt-4">
          <summary className="text-sm font-medium">Show Explanation </summary>
          <p className="fade text-sm mt-2">{quizeData[currentQuestion]?.explanation}</p>
        </details>
      </div>
      <div className="w-full flex justify-end gap-4 mt-1">
        <Button onClick={() => setCurrentQuestion(currentQuestion > 0 ? currentQuestion - 1 : 9)} title="Prev" containerClass="bg-white/50 hover:bg-white hover:text-black" />
        <Button onClick={() => currentQuestion < 9 ? setCurrentQuestion(currentQuestion + 1) : setShowSubmitConfirmation(true)} title={currentQuestion < 9 ? 'Next' : 'Submit'} containerClass="bg-white/50 hover:bg-white hover:text-black" />
      </div>
    </div>
  )
}

export default Quiz