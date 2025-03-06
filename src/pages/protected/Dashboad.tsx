import { useEffect, useState } from "react";
import { useFetch } from "../../services/useFetch";
import IndustryInsights from "../../components/IndustryInsights";



const Dashboad = () => {

  const [apiInfo, setApiInfo] = useState<{ api: string; method: "get" | "post" | ""; info?: {} } | null>(null);
  const { loading, response } = useFetch(apiInfo ?? { api: "", method: "" })

  useEffect(() => {
    setApiInfo({ api: '/v1/user/getIndustryInsights', method: "post", info: { industry: 'Technology' } })
  }, [])

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className="text-white w-full md:w-[80%] mx-auto">

        <IndustryInsights data={response}/>

    </div>
  )
}

export default Dashboad