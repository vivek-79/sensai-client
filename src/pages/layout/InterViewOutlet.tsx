import { Outlet } from "react-router-dom"


const InterViewPrep = () => {
  return (
    <div className="w-full md:w-[80%] py-6 mx-auto px-4 md:px-6">
      {<Outlet/>}
    </div>
  )
}

export default InterViewPrep