import { useEffect, useState } from "react";
import { useFetch } from "../../services/useFetch"
import ResumeBuilder from "../../components/ResumeBuilder";
import { Mosaic } from "react-loading-indicators";


const Resume = () => {

    const [server, setServer] = useState<{ api: string, method: "" | "get" | "post" }>({ api: '', method: '' });
    const {response ,loading} = useFetch({api:server.api,method:server.method});
    const [data, setData] = useState<{id:number,content:string} | null>();

    useEffect(()=>{
        if(!response?.data?.success){
            setServer({api:'/v1/resume/get',method:'get'});
            setData(response?.resume)
        }
        else{
            setServer({api:'',method:''})
        }
    },[response])

    if (loading) {

        return <div className="fixed inset-0 flex items-center justify-center">
            <Mosaic color="#ffffff" size="medium" text="" textColor="" />
        </div>
    }
  return (
    <section className="py-6 w-full md:w-[80%] mx-auto px-2">
        <ResumeBuilder data={{id:data?.id,content:data?.content}}/>
    </section>
  )
}

export default Resume