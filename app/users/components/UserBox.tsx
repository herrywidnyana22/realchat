'use client'

import axios from "axios"
import Avatar from "@/app/components/avatar/Avatar"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import LoadingModal from "@/app/components/LoadingModal"

interface UserBoxProps{
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({data}) => {
    const [isLoading, setIsLoading] = useState(false)
    const route = useRouter()

    const handleClick = useCallback(() =>{
        setIsLoading(true)

        axios.post('/api/chat',{
            userId: data.id
        })
        .then((user) =>{
            route.push(`/chat/${user.data.id}`)
        })
        .finally(() => setIsLoading(false))
    }, [data, route])

    return (
    <>
        {
            isLoading && <LoadingModal/>
        }
        
        <div 
            className="
                relative
                flex
                items-center
                w-full
                p-3
                space-x-3
                rounded-lg
                transition
                cursor-pointer
                bg-white
                hover:bg-neutral-100
            "
            onClick={handleClick}
        >
            <Avatar userImage={data}/>
            <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-1
                    ">
                        <p className="
                            font-medium
                            text-sm
                            text-gray-900
                        ">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default UserBox