import React from 'react'
import authService from '../appwrite/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Logo, Button, Input} from './index'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
function Signup() {
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm()

    const signup =  async(data) => {
        console.log("FORM SUBMITTED", data);
        setError("")
        try {
            const userAccount = await authService.createAccount(data)
            console.log("ACCOUNT:", userAccount);
            if(userAccount) {
                const userData = await authService.getCurrentUser()
                console.log("USER:", userData);
                if(userData) {
                    dispatch(login({
                        $id: userData.$id,
                        name: userData.name,
                        email: userData.email
                    }))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(signup)}> 
                <div className='space-y-5'>
                    <Input 
                    label="Full Name: "
                    type="text"
                    placeholder="Enter Your Full Name"
                    {...register("name", {
                        required: true
                    })}
                    />
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
                    {errors.password && (
                        <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                    )}
                    <p className="text-sm text-blue-600 mt-2">
                        Use a strong password with uppercase, lowercase, number, and special character.
                    </p>
                    <Button
                    type='submit'
                    className='w-full'
                    >Create Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup