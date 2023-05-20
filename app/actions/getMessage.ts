import prisma from "@/app/libs/chatdb"

const getMessages = async(chatId: string) =>{
    try {
        const messages = await prisma.chat.findMany({
            where: {
                conversationId: chatId
            }, 
            
            include: {
                sender: true,
                seen: true,
            }, 
            
            orderBy: {
                createdAt: "asc"
            }
        })

        return messages

    } catch (error: any) {
        return[]
    }
}

export default getMessages