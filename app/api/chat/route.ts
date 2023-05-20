import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/chatdb"
import { pusherServer } from "@/app/libs/pusher";

import { NextResponse } from "next/server";

export async function POST (
    req: Request
)
{
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json()

        const {
            userId,
            isGroup,
            members,
            name
        } = body

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401})
        }

        // if groupchat
        if(isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid group chat', { status: 400})
        }

        // group chat handle
        if(isGroup){
            const newChat = await prisma.conversation.create({
                data:{
                    name, isGroup, 
                    users:{
                        connect:[
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })), {
                                id: currentUser.id
                            }
                        ]
                    }
                }, 
                
                include:{
                    users: true
                }
            })

            newChat.users.forEach((user) =>{
                if (user.email){
                    pusherServer.trigger(user.email, 'conversation:new', newChat)
                } 
            })

            return NextResponse.json(newChat)
        }

        // exist chat
        const existChat = await prisma.conversation.findMany({
            where: {    
                OR: [{
                        userIds:{
                            equals:[currentUser.id, userId]
                        }
                    }, {
                        userIds:{
                            equals:[userId, currentUser.id]
                        }
                    }]
                }
        })

        
        const singleChat = existChat[0]
        
        if (singleChat){
            return NextResponse.json(singleChat)
        }

        // add new chat
        const newChat = await prisma.conversation.create({
            data:{
                users:{
                    connect:[{
                        id: currentUser.id
                    }, {
                        id: userId
                    }]
                }
            }, 
            
            include:{
                users: true
            }
        })

        newChat.users.map((user) =>{
            if (user.email){
                pusherServer.trigger(user.email, 'conversation:new', newChat)
            } 
        })

        return NextResponse.json(newChat)

    } catch (error: any) {
        return new NextResponse('Internal error', { status: 500 })
        
    }
}