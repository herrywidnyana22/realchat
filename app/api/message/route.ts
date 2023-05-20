import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/chatdb"
import { NextResponse } from "next/server"
import { pusherServer } from "@/app/libs/pusher"

export async function POST(req: Request){
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json()
        const{ chat, image, chatId} = body

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const newChat = await prisma.chat.create({
            data:{
                body: chat,
                image: image,
                conversation:{
                    connect:{
                        id: chatId
                    }
                }, 
                
                sender:{
                    connect:{
                        id: currentUser.id
                    }
                }, 
                
                seen:{
                    connect:{
                        id: currentUser.id
                    }
                }
            }, 
            
            include: {
                seen: true,
                sender: true
            }
        })

        const updatedChat = await prisma.conversation.update({
            where:{
                id: chatId
            },

            data:{
                lastChatAt: new Date(),
                chats:{
                    connect:{
                        id: newChat.id
                    }
                }
            },

            include:{
                users: true,
                chats: {
                    include:{
                        seen: true
                    }
                }
            }
        })

        await pusherServer.trigger(chatId, 'chat:new', newChat)
        const lastChat = updatedChat.chats[updatedChat.chats.length - 1]

        updatedChat.users.map((user) =>{
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: chatId,
                chats: [lastChat]
            })
        })

        return NextResponse.json(newChat)
        
    } catch (error:any) {
        console.log(error, "ERROR_MESSAGES")
        return new NextResponse('Internal Error!', { status: 500 })
    }
}