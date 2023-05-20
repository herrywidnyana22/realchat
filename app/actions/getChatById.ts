import prisma from "@/app/libs/chatdb"
import getCurrentUser from "./getCurrentUser";


const getChatById = async(chatId: string) => {
    try {
        const currentUser = await getCurrentUser()
        if(!currentUser?.email){
            return null
        }

        const chat = await prisma.conversation.findUnique({
            where: {
                id: chatId
            }, 
            
            include: {
                users: true
            }
        })

        return chat

    } catch (error: any) {
        return null
    }
}
 
export default getChatById;