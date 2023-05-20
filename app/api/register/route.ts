import bcrypt from 'bcrypt'

import prisma from '@/app/libs/chatdb'
import { NextResponse } from 'next/server'

export async function POST(request:Request) {
    try {
        const body = await request.json()
        const { email, name, password } = body

        if (!name || !email || !password) return new NextResponse('Missing info', { status: 400 })

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data:{
                email,
                name,
                hashPassword: hashedPassword
            }
        })

        return NextResponse.json(user)

    } catch (error: any) {
        console.log(error, 'Registration_error')
        return new NextResponse('Internal Error!', { status: 500 })
    }
}