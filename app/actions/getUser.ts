import prisma from "@/app/libs/chatdb"

import getSession from "./getSession"

const getAllUsers = async () =>{
    const session = await getSession()

    if(!session?.user?.email) return []

    try {
        const allUser = await prisma.user.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            where: {
                NOT:{
                    email: session.user.email
                }
            }
        })
        return allUser
        
    } catch (error: any) {
        return[]
    }
}

export default getAllUsers