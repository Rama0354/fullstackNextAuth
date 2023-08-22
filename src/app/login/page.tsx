"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter()
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [user,setUser] = useState({
        email:'',
        password:'',
    })

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setBtnDisabled(false)
        }else{
            setBtnDisabled(true)
        }
    },[user])
    const onLogin = async ()=>{
        try {
            setIsLoading(true)
            const res = await axios.post('/api/users/login',user)
            console.log('Login Success!',res.data)
            toast.success("Login Success")
            router.push('/profile')
        } catch (error:any) {
            console.log("Login Failed!", error.message)
            toast.error(error.response.data.error)
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className='flex flex-col justify-center items-center min-h-screen py-2 gap-3'>
            <div className="relative w-96 p-2 border border-blue-200 rounded-lg">
                <div className="p-2 border-b border-blue-600 mb-3 flex gap-3">
                    <h1 className='font-bold text-3xl text-blue-600'>Login</h1>
                    {isLoading ? (
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ):(
                        <></>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">E-Mail</label>
                    <input className='p-2 border-gray-300 border-2 focus:border-blue-400 outline-none focus:outline-none rounded-md text-gray-700' type="email" name='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='admin@mail.com' autoComplete='off' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input className='p-2 border-gray-300 border-2 focus:border-blue-400 outline-none focus:outline-none rounded-md text-gray-700' type="password" name='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='*********' />
                </div>
                <div className="flex justify-between gap-2 py-2 mt-3">
                    <button onClick={onLogin} disabled={btnDisabled} className='w-full p-2 bg-blue-600 hover:bg-blue-800 disabled:bg-gray-600 disabled:text-gray-200 font-medium hover:font-bold text-white text-lg rounded-md'>Login</button>
                </div>
                <p>You not have Account <Link href={'/signup'} className='text-blue-700'>Signup</Link></p>
            </div>
            <Toaster/>
        </div>
    )
}