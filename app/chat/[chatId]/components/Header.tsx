'use client'

import Avatar from "@/app/components/avatar/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import Link from "next/link"
import { Conversation, User } from "@prisma/client"
import { useMemo, useState } from "react"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"
import ProfileOption from "./ProfileOption"
import AvatarGroup from "@/app/components/avatar/AvatarGroup"
import useActiveUser from "@/app/hooks/useActiveUser"

interface HeaderProps{
    chat: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({chat}) => {
    const otherUser = useOtherUser(chat)
    const [openOption, setOpenOption] = useState(false)
    const {members} = useActiveUser()
    const isUserActive = members.indexOf(otherUser?.email!) !== -1

    const statusText = useMemo(() =>{
        if(chat.isGroup){
            return `${chat.users.length} members`
        }

        return isUserActive ? "Online" : "Offline"
    },[chat, isUserActive])

    return (
        <>
            <ProfileOption 
                data={chat}
                isOpen={openOption}
                onClose={() => setOpenOption(false)}
            />
            <div className="
                flex
                justify-between
                items-center
                w-full
                px-4
                py-3
                border-b-[1px]
                sm:px-4
                lg:px-6
                shadow-sm
                bg-white
            ">
                <div className="
                    flex
                    items-center
                    gap-3
                ">
                    <Link 
                        href="/chat"
                        className="
                            block
                            lg:hidden
                            transition
                            cursor-pointer
                            text-sky-500
                            hover:text-sky-600
                        "
                    >
                        <HiChevronLeft size={32}/>
                    </Link>
                    {
                        chat.isGroup 
                        ? <AvatarGroup users ={chat.users}/>
                        : <Avatar userImage={otherUser}/>
                    }
                    <div className="flex flex-col">
                        <div>
                            {chat.name || otherUser.name}
                        </div>
                        <div className="
                            text-sm
                            font-light
                            text=neutral-500
                        ">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal 
                    size={32}
                    className="
                        cursor-pointer
                        text-sky-500
                        hover:text-sky-600
                        transition
                    "
                    onClick={() => setOpenOption(true)}
                />
            </div>
        </>
        
    )
}

export default Header