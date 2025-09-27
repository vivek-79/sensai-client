import axios from "axios";
import { useEffect, useState } from "react";
import { errorMessage } from "../helpers/errorMessage";


interface Fetch {
    api: string;

    info?: Record<string, any>;
    method: "get" | "post" | "";
}



export const useFetch = ({ api, info, method }: Fetch) => {

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>()
    const [response, setResponse] = useState<any>(null);



    useEffect(() => {


        const fetchData = async () => {
            if (!api || !method) return;
            try {


                setLoading(true)
                let res;

                if (method === 'get') {

                    res = await axios.get(`${api}`, { withCredentials: true });
                }
                if (method === 'post') {
                    res = await axios.post(`${api}`, info, { withCredentials: true });
                }

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

    }, [api, info, method])


    return { response, loading, error }
}