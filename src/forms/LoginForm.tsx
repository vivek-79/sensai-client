

import { useForm } from "react-hook-form"
import FormChild from "../components/atoms/FormChild"
import Button from "../components/atoms/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { errorMessage } from "../helpers/errorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";






const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignInSchemaType = z.infer<typeof signInSchema>;

const LoginForm = ({ switchForm }: { switchForm: () => void }) => {

    const navigate = useNavigate();
    const [error,setError] = useState<string>()

    const { handleSubmit, register, formState: { errors } } = useForm<SignInSchemaType>({
        resolver: zodResolver(signInSchema)
    });

    const signUp = async(data: any) => {

        setError('')

       try {
        const userData = await axios.post('/v1/auth/signin',data);

           if (userData.data.success){
            navigate('/')
           }
       } catch (error:any) {
         setError(errorMessage(error))
       }
    }
    return (
        <form
            onSubmit={handleSubmit(signUp)}
            className="w-[80%] h-full">
            <h1 className="text-center text-2xl font-medium text-white mb-4">Login</h1>
            {error && <p className="text-red-500/60 text-center">{error}</p>}
            <FormChild label="Email" type="email" id="email" register={register} />
            {errors.email && <p className="text-red-500/60 -mt-3">{errors.email.message}</p>}
            <FormChild label="Password" type="password" id="password" register={register} />
            {errors.password && <p className="text-red-500/60 -mt-3">{errors.password.message}</p>}
            <Button title="Sign Up" containerClass="text-white bg-green-400/40 w-full mt-8" />
            <p onClick={switchForm} className="cursor-pointer mx-auto text-center w-full mt-2">Don&apos;t have an account? <b>Sign Up</b></p>
        </form>
    )
}

export default LoginForm