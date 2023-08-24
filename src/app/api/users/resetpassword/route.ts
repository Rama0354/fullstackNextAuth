import {connect} from '@/dbConfig/dbConfig'
import { NextRequest,NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token,user} = reqBody

        const pass = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        if(!pass){
            return NextResponse.json({error:'Invalid Token'},{status:400})
        }
        console.log(pass)

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(user.password, salt)

        pass.password = hashedPassword
        pass.forgotPasswordToken = undefined
        pass.forgotPasswordTokenExpiry = undefined
        await pass.save()

        return NextResponse.json({
            message:"Email Verifed Successfully!",
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}