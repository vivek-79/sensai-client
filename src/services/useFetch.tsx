import axios from "axios";
import { useEffect, useState } from "react";
import { errorMessage } from "../helpers/errorMessage";


interface Fetch {
    api: string;

    info?: Record<string, any>;
    method: "get" | "post" |"";
}



export const useFetch =({ api, info, method }: Fetch) => {

    const server = import.meta.env.VITE_API_URL
    
    const [error,setError] = useState<string>('')
    const [loading,setLoading] = useState<boolean>()
    const [response,setResponse] = useState<any>(null);



    useEffect(()=>{


        const fetchData = async()=>{
            if (!api || !method) return;
        try {


            setLoading(true)
            let res;

            if (method === 'get') {

                res = await axios.get(`${server}${api}`);
            }
            if (method === 'post') {
                res = await axios.post(`${server}${api}`, info);
            }

            console.log(res)
            //@ts-ignore
            setResponse(res?.data || [])
        } catch (error) {
            console.log(error)
            setError(errorMessage(error))
        } finally {
            setLoading(false)
        }
    };

    fetchData();

    },[api,info,method])

   
    return { response,loading,error}
}