import prisma from "@/app/libs/chatdb"

import getCurrentUser from "./getCurrentUser"

const getChat = async () =>{
    const currentUser = await getCurrentUser()

    if(!currentUser?.id) return []

    try {
        const chat = await prisma.conversation.findMany({
            // order by latest active
            orderBy:{
                lastChatAt: 'desc'
            }, 
            
            where: {
                userIds:{
                    has: currentUser.id
                }
            }, 
            
            include: {
                users: true,
                chats: {
                    include:{
                        sender: true,
                        seen: true
                    }
                }
            }
        })

        return chat
    } catch (error:any) {
        return[]
    }
}

export default getChat