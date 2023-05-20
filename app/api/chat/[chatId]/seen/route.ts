import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/chatdb"
import { NextResponse } from "next/server"
import { pusherServer } from "@/app/libs/pusher"

interface seenParams {
    chatId?: string
}

export async function POST(req: Request, {params}: { params: seenParams}){
    
    try {
        const currentUser = await getCurrentUser()
        const { chatId } = params

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized!", { status: 401 } )
        }

        // existing chat
        const chat = await prisma.conversation.findUnique({
            where:{
                id: chatId
            },

            include:{
                chats:{
                    include:{
                        seen: true
                    }
                }, 

                users: true
            }
        })

        if(!chat) return new NextResponse("Invalid ID!", { status : 400 })

        // last message
        const lastChat = chat.chats[chat.chats.length - 1]

        // const allNewChat = chat.chats[chat.chats.length]
        if(!lastChat) return NextResponse.json(chat)

        // update last seen message
        const updateSeenChat = await prisma.chat.update({
            where:{
                id: lastChat.id,
            },
            
            include:{
                seen: true,
                sender: true
            },

            data:{
                seen:{
                    connect:{
                        id: currentUser.id
                    }
                }
            },
        })

        
        // const updatedChatNotGroup = await prisma.chat.updateMany({
            
        //     where: {
        //         AND: [{
        //             conversationId: chatId
        //         },{
        //             NOT:{
        //                 seenIds:{
        //                     has: currentUser.id
        //                 }
        //             }
        //         }]
        //     },
        //     data: {
        //         seenIds: {
        //             push: currentUser.id
        //         },
        //     },
            

        // });

        // chat.isGroup 
        // ? updateSeenChat = updateChatIsGroup
        // : updateSeenChat = updatedChatNotGroup

        
        // pusher update for update sidebar chat
        await pusherServer.trigger(currentUser.email, 'conversation:update',{
            id: chatId,
            chats: [updateSeenChat]
        })
        
        if(lastChat.seenIds.indexOf(currentUser.id) !== -1){
            return NextResponse.json(chat)
        }

        // untuk seen chat statuss
        await pusherServer.trigger(chatId!, 'chat:update', updateSeenChat)

        return NextResponse.json(updateSeenChat)

    } catch (error: any) {
        console.log(error, "ERROR_MESSAGE_SEEN")
        return new NextResponse("Internal Error!", { status: 500 })
    }
}