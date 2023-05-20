'use client'

import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { BsGithub, BsGoogle } from 'react-icons/bs'

import Button from "@/app/components/Button"
import Input from "@/app/components/input/Input"
import AuthSocialButton from "./AuthSocialButton"

import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

type Status = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()

    const [status, setStatus] = useState<Status>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    useEffect(() =>{
        if (session?.status === 'authenticated') {
            console.log('Authentication')
            router.push('/users')
        }
    },[session?.status, router])

    //button already have an account? register / login
    const toggleStatus = useCallback(() =>{
        status === 'LOGIN' 
        ? setStatus('REGISTER')
        : setStatus('LOGIN')
    }, [status])

    // default value form
    const {
        register, handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        if(status === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something error!'))
            .finally(() => setIsLoading(false))
        }
        
        if(status === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            
            .then((response) => {
                if(response?.error) toast.error('Wrong Password or Username')

                if (response?.ok && !response?.error) {
                    toast.success("Logged in...")
                    router.push('/users')
                }
            })
            
            .finally(() => setIsLoading(false))
        }
        

    }

    const socialAction = (action: string) =>{
        setIsLoading(true)

        // Auth Social Login/Sign in
        signIn(action, { redirect:false })
        .then((response) =>{
            if(response?.error) toast.error('Invalid credential')

            if (response?.ok && !response?.error) {
                toast.success("Logged in...")
                router.push('/users')
            }
 
        })
        .finally(() => setIsLoading(false))


    }

    return (
        <div className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        ">
            <div className="
                shadow
                px-4
                py-8
                bg-white
                sm:rounded-lg
                sm:px-10
            ">
                <form 
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                   { status === 'REGISTER' && (
                    <Input 
                        id="name" 
                        label="Name"
                        type="text" 
                        register={register} 
                        errors={errors}
                        disabled={isLoading}
                    />
                   )}

                    <Input 
                        id="email" 
                        label="Email"
                        type="email" 
                        register={register} 
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input 
                        id="password" 
                        label="Password"
                        type="password" 
                        register={register} 
                        errors={errors}
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}    
                    >
                        {
                            status === 'LOGIN' 
                            ? 'Sign in'
                            : 'Register'
                        }
                    </Button>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="
                            absolute
                            flex
                            items-center
                            inset-0
                        ">
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="
                            relative
                            flex
                            justify-center
                            text-sm
                        ">
                            <span className="
                                bg-white
                                px-2
                                text-gray-500
                            ">
                                Or continuw with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className="
                    flex
                    justify-center
                    gap-2
                    mt-6
                    py-2
                    text-sm
                    text-gray-500
                ">
                    <div>
                    {
                        status === 'LOGIN'
                        ? 'New to Real Chat?'
                        : 'Already have an account?'
                    }
                    </div>
                    <div 
                        className="underline cursor-pointer"
                        onClick={toggleStatus}
                    >
                    {
                        status === 'LOGIN'
                        ? 'Create an account'
                        : 'Login'
                    }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AuthForm