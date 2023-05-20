'use client'

import useConversation from "@/app/hooks/useChat";
import ChatBox from "./ChatBox";
import clsx from "clsx";
import GroupChatModal from "./GroupChatModal";
import { MdGroupAdd } from "react-icons/md"
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ChatListProps{
    // ambil dari tabel conversation, initialitem untuk pusher socket
    initialItems: FullConversationType[]
    user: User[]
}

const ChatList: React.FC<ChatListProps> = ({initialItems, user}) => {
    const session = useSession()
    const [chatList, setChatList] = useState(initialItems)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const route = useRouter()
    const {chatId, isOpen} = useConversation()

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    },[session.data?.user?.email])

    useEffect(() => {
        if(!pusherKey) return

        pusherClient.subscribe(pusherKey)

        const newHandler = (chat: FullConversationType) =>{
            setChatList((current) =>{
                if(find(current, { id: chat.id})){
                    return current
                }

                return [chat, ...current]
            })
        }

        const updateHandler = (newChat: FullConversationType) =>{
            setChatList((current) => current.map((currentChat) =>{
                if(currentChat.id === newChat.id) {
                    return {
                        ...currentChat,
                        chats: newChat.chats
                    }
                }

                return currentChat
            }))

        }

        const removeHandler = (chat: FullConversationType) =>{
            setChatList((current) =>{
                return [...current.filter((chatItem) => chatItem.id !== chat.id)]
            })

            if(chatId === chat.id) {
                route.push('/chat')
            }
        }

        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:remove', removeHandler)

        }
    }, [pusherKey, chatId, route])
    

    return (
    <>
        <GroupChatModal 
            user={user}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />

        <aside className={clsx(`
            fixed
            inset-y-0
            pb-20
            overflow-y-auto
            border-r
            border-gray-200
            bg-white
            lg:block
            lg:w-80
            lg:left-20
            lg:pb-0`,
            isOpen ? 'hidden' : 'w-full block left-0'
        )}
        >
            <div className="px-5">
                <div className="
                    flex
                    justify-between
                    mb-4
                    pt-4
                ">
                    <div className="
                        text-xl
                        font-bold
                        text-neutral-800
                    ">
                        Chat
                    </div>
                    <div 
                        className="
                            p-2
                            rounded-full
                            cursor-pointer
                            hover:opacity-75
                            transition
                            bg-gray-100
                            text-gray-600
                        "
                        onClick={() => setIsModalOpen(true)}
                    >
                          <MdGroupAdd size={18}/>
                    </div>
                </div>
                {
                    chatList.map((item, i) =>(
                        <ChatBox
                            key={i}
                            data={item}
                            selected={chatId === item.id}
                        />
                    ))
                }
            </div>

        </aside>
    </>
    );
}
 
export default ChatList;