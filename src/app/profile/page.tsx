"use client"
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import {useState} from 'react'

export default function ProfilePage() {
    const router = useRouter()
    const [data,setData] = useState('nothing')
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

    const getUserDetais = async ()=>{
        const res = await axios.get('/api/users/me')
        setData(res.data.data._id)
    }
    return (
        <>
        <div className='flex flex-col justify-center items-center min-h-screen py-2 gap-3'>
            <h1 className='text-3xl text-blue-600 font-bold'>Profile</h1>
            <h2 className='p-1 bg-amber-500 text-white'>{data === "nothing"?"nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <p>Profile page</p>
            <div className="flex gap-3">
                <button onClick={getUserDetais} className='p-2 bg-emerald-600 hover:bg-emerald-800 font-medium hover:font-bold text-white'>Get Data</button>
                <button onClick={logout} className='p-2 bg-blue-600 hover:bg-blue-800 font-medium hover:font-bold text-white'>Logout</button>
            </div>
        </div>
        </>
    )
}
