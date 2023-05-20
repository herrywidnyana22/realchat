import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/chatdb"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json()
        const {name, image}= body

        if(!currentUser) return new NextResponse("Unauthorize", { status: 401})

        const updateUser = await prisma.user.update({
            where:{
                id: currentUser.id
            },

            data:{
                image,
                name
            }
        })

        return NextResponse.json(updateUser)

    } catch (error: any) {
        console.log(error, "ERROR_SETTING")
        return new NextResponse("Internal Error", { status: 500 })
    }

}