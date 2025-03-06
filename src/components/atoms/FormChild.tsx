import { FC } from "react";




interface formChild{
    label:string;
    type:string;

    protect?:boolean;
    id:string;
    register?:any;
    containerClass?:string;
    placeHolder?:string;
    error?: string | undefined;
}

const FormChild: FC<formChild> = ({ label, type, protect = false, id, register, containerClass, placeHolder = '', error }) => {

  const date =Date.now()+id
  return (
    <div className={`w-full flex flex-col items-start mb-3 ${containerClass}`}>
      <label className="text-white ml-1 text-[17px]" htmlFor={`${date}`}>{label}</label>
      <input className="w-full h-9 border-[0.5px] border-white/50  bg-gray-50/20 outline-none text-white/60 px-2 rounded-md" {...(register ? register(id) : {})} id={`${date}`} type={protect ? 'password' :type} autoComplete={id} placeholder={placeHolder}/>
      {error && (
       <p className="text-red-500/60 ">{error}</p>
      )}
    </div>
  )
}

export default FormChild