import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/chatdb"
import { pusherServer } from "@/app/libs/pusher"
import { NextResponse } from "next/server"

 interface IParams{
    chatId?: string
 }

 export async function DELETE(req: Request, {params}: {params : IParams}){
    try {
        const { chatId } = params
        const currentUser = await getCurrentUser()

        if (!currentUser?.id) return new NextResponse("Unauthorize", { status: 500 })

        const existChat = await prisma.conversation.findUnique({
            where:{
                id: chatId
            },

            include:{
                users: true
            }
        })

        if(!existChat) return new NextResponse("Invalid ID!", { status: 400 })

        const deleteChat = await prisma.conversation.deleteMany({
            where:{
                id: chatId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            }
        })

        existChat.users.forEach((user) => {
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:remove', existChat)
            }
        });

        return NextResponse.json(deleteChat)

    } catch (error: any) {
        console.log(error, "ERROR_DELETE_CHAT")
        return new NextResponse("Internal Error!", { status: 500 })
    }
 }