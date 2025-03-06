import { useForm } from "react-hook-form"
import FormChild from "../components/atoms/FormChild"
import Button from "../components/atoms/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../helpers/errorMessage";
import axios from "axios";




const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {


  const navigate = useNavigate()
  const [error, setError] = useState<string>()
  const { handleSubmit, register, formState: { errors } } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema)
  });

  const signUp = async(data: any) => {

    setError('')

    try {
      const userData = await axios.post('/v1/auth/signup', data);

      if (userData.data.success) {
        navigate('/onboarding')
      }
    } catch (error: any) {
      setError(errorMessage(error))
    }
  }
  return (
    <form
      onSubmit={handleSubmit(signUp)}
      className="w-[80%] h-full">
      <h1 className="text-center text-2xl font-medium text-white mb-4">Sign Up</h1>
      {error && <p className="text-red-500/60 text-center">{error}</p>}
      <FormChild label="Name" type="text" id="name" register={register} />
      {errors.name && <p className="text-red-500/60 -mt-3">{errors.name.message}</p>}
      <FormChild label="Email" type="email" id="email" register={register} />
      {errors.email && <p className="text-red-500/60 -mt-3">{errors.email.message}</p>}
      <FormChild label="Password" type="password" id="password" register={register} />
      {errors.password && <p className="text-red-500/60 -mt-3">{errors.password.message}</p>}
      <Button title="Sign Up" containerClass="text-white bg-green-400/40 w-full mt-8" />
      <p onClick={switchForm} className="cursor-pointer mx-auto text-center w-full mt-2">Alredy have an account? <b>Sign In</b></p>
    </form>
  )
}

export default SignUpForm