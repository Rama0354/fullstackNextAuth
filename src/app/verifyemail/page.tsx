"use client"
import axios from 'axios'
import Link from 'next/link'
import React,{useState,useEffect} from 'react'

export default function VerifyEmailPage(){
    const [token,setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifyUserEmail = async()=>{
        try {
            await axios.post('/api/users/verifyemail',{token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        }
    }
    useEffect(()=>{
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken||'')
    },[])
    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])

    return (
        <div className="flex flex-col min-h-screen justify-center items-center py-2">
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2'>
                {token ? `${token}` : 'No token'}
            </h2>
            {verified &&
                <div>
                    <h2 className='text-2xl'>Verived Email</h2>
                    <Link href={'/login'} className='text-blue-600'>Login</Link>
                </div>
            }
            {error &&
                <div>
                    <h2 className='text-2xl font-semibold text-rose-600'>Error</h2>
                </div>
            }
        </div>
    )
}