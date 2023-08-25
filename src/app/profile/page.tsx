"use client"
import React, { useCallback, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast,{Toaster} from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import {useState} from 'react'

export default function ProfilePage() {
    const router = useRouter()
    const [onOpen,setOnOpen] = useState(false)
    const [data,setData] = useState({
        username:'',
        email:'',
        _id:''
    })
    const logout = async ()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout Success!')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getData = useCallback(async()=>{
        await axios.get('/api/users/me')
        .then((data:any)=>{
            setData(data.data.data)
            console.log(data.data.data)
        })
    },[data])
    
    useEffect(()=>{
        getData()
    },[])

    const getUserDetais = async ()=>{
        const res = await axios.get('/api/users/me')
        setData(res.data.data._id)
    }
    return (
        <>
        <div className='flex flex-col py-2 gap-3'>
            <div className="container mx-auto">
                <div className='relative flex justify-between border-b border-slate-100/20 py-2'>
                    <div className="relative flex items-center gap-3">
                        <h1 className='text-3xl text-blue-600 font-bold'>Profile</h1>
                    </div>
                    <div className="relative">
                        <button onClick={()=>setOnOpen(!onOpen)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                            {data.username !== '' ? data.username : 'User'}
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        {onOpen && (
                            <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>{data.username}</div>
                                <div className="font-medium truncate">{data.email}</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownuser">
                                    <li>
                                        <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                    </li>
                                    <li>
                                        <Link href={`/profile/${data._id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                                    </li>
                                </ul>
                                <div className="py-2">
                                <button onClick={logout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='relative'>
                        <h1>content</h1>
                </div>
            </div>
        </div>
        <Toaster/>
        </>
    )
}
