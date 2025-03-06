
import { useState } from "react";
import { industries } from "../data/indutries"
import { zodResolver } from "@hookform/resolvers/zod";
import { OnBoardingType, onBoardingZod } from "../helpers/types";
import { useForm } from "react-hook-form";
import FormChild from "../components/atoms/FormChild";
import Button from "../components/atoms/Button";
import { useFetch } from "../services/useFetch";
import { useNavigate } from "react-router-dom";






const OnBoardForm = () => {


    const navigate = useNavigate();
    const { handleSubmit, register, watch, formState: { errors } } = useForm<OnBoardingType>({
        resolver: zodResolver(onBoardingZod)
    });
    const industry: string = watch("industry");

    
    const [apiInfo, setApiInfo] = useState<{ api: string; method: "get"|"post"|""; info?: {} } | null>(null);
    const { error, loading, response } = useFetch(apiInfo ?? { api: "", method: "" })
    console.log(error, loading, response);

    if(response?.success){
        navigate('/dashboard')
    }
    const onBoard =(data: OnBoardingType) => {
        setApiInfo({ api:'/v1/user/onBording',method:"post",info:data})
    }

    return (
        <form onSubmit={handleSubmit(onBoard)} className="w-full relative text-white border-[1px] border-white/50 shadow-md shadow-white/50 rounded-md px-2 py-4">
            { loading && <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
            <p className="text-xl font-medium">Updating...</p>
            </div> }
            <h2 className="text-center text-2xl font-medium">Complete Your Profile</h2>
            <p className="text-sm tracking-tight text-center mt-2 text-white/50">Select your industry to get personalized carrer insights and recommendations.</p>

            {error && <p className="text-red-500/60 mt-3">{error}</p>}
            <div className="w-full mt-4">
                <label className="text-white ml-1 text-[17px]" htmlFor='industry'>Industry</label>
                <select id="industry" className="inpt" {...register('industry')}>
                    {industries.map((item) => (
                        <option id={item.name} key={item.name} className="text-black">{item.name}</option>
                    ))}
                </select>
                {errors.industry && <p className="text-red-500/60 -mt-3">{errors.industry.message}</p>}
            </div>

            <div className="w-full mt-4">
                <label className="text-white ml-1 text-[17px]" htmlFor='industry'>Specialization</label>
                <select id="subIndustry" className="inpt" {...register('specialization')}>
                    {industry && industries.map((item) => {
                        if (item.name == industry) {
                            return item.subIndustries.map((item, indx) => (
                                <option id={indx + ''} key={item} className="text-black">{item}</option>
                            ))
                        }
                    })}
                </select>
                {errors.specialization && <p className="text-red-500/60 -mt-3">{errors.specialization.message}</p>}
            </div>

            <FormChild id="experiance" label="Years of Experience" type="number" containerClass="mt-6" register={register}/>
            {errors.experiance && <p className="text-red-500/60 -mt-3">{errors.experiance.message}</p>}
            <FormChild id="skills" label="Skills" type="text" containerClass="mt-6" placeHolder="@React,Nextjs" register={register} />
            {errors.skills && <p className="text-red-500/60 -mt-3">{errors.skills.message}</p>}
            <div className="w-full mt-2 flex-col">
                <label className="text-white ml-1 text-[17px]" htmlFor='bio'>Professional Bio</label>
                <textarea  id="bio" className="inpt h-24!" {...register('professionalBio')}></textarea>
                {errors.professionalBio && <p className="text-red-500/60 -mt-3">{errors.professionalBio.message}</p>}
            </div>
            
            <Button title="Complete Boarding" containerClass="bg-white text-black mt-4  w-full"/>
        </form>
    )
}

export default OnBoardForm