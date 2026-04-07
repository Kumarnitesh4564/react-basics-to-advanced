import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { Link } from 'react-router-dom'
import { Input, Logo, Button } from './index'
import { login as authLogin } from '../store/authSlice'
import { useForm } from "react-hook-form"

function Login() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)

    const login = async(data) => {
        console.log("data");
        
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            console.log("session");
            
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                    console.log("userdata");
                    
                    dispatch(authLogin({
                    $id: userData.$id,
                    name: userData.name,
                    email: userData.email
                }))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: "Email is required",
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input 
                label="PassWord: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: "Password is required",
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                        message: "Password must be strong (8+ chars, uppercase, lowercase, number, special char)"
                    }
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >{loading ? "Signing in" : "Sign in"}</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login