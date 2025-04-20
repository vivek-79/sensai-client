import { useEffect, useState } from "react";
import { useFetch } from "../../services/useFetch";
import IndustryInsights from "../../components/IndustryInsights";
import { Mosaic } from 'react-loading-indicators'


const Dashboad = () => {

  const [apiInfo, setApiInfo] = useState<{ api: string; method: "get" | "post" | ""; info?: {} } | null>(null);
  const { loading, response } = useFetch(apiInfo ?? { api: "", method: "" })

  useEffect(() => {
    setApiInfo({ api: '/v1/user/getIndustryInsights', method: "post", info: { industry: 'Technology' } })
  }, [])

  if (loading) {

    return <div className="fixed inset-0 flex items-center justify-center">
      <Mosaic color="#ffffff" size="medium" text="" textColor="" />
    </div>
  }
  return (
    <div className="text-white w-full md:w-[80%] mx-auto">

        <IndustryInsights data={response}/>

    </div>
  )
}

export default Dashboad