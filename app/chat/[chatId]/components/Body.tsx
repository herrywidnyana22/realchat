'use client'

import axios from "axios"
import useChat from "@/app/hooks/useChat"
import ChatItemBox from "./ChatItemBox"
import { FullChatType } from "@/app/types"
import { useEffect, useRef, useState } from "react"
import { Conversation, User } from "@prisma/client"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

interface BodyProps{
    initialChat: FullChatType[]
    
    user: Conversation & {
        users: User[]
    }
}

const Body: React.FC<BodyProps> = ({initialChat, user}) => {
    const [chat, setChat] = useState(initialChat)
    const { chatId } = useChat()
    const bottomRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        axios.post(`/api/chat/${chatId}/seen`)
    },[chatId])

    useEffect(() => {
        pusherClient.subscribe(chatId)
        bottomRef?.current?.scrollIntoView()

        const chatHandler = (chat: FullChatType) =>{
            axios.post(`/api/chat/${chatId}/seen`)
            
            setChat((current) =>{
                if(find(current, {id: chat.id})) return current

                return [...current, chat]
            })

            bottomRef?.current?.scrollIntoView()
        }

        const updateChatHandler = (newChat: FullChatType) =>{
            setChat((current) => current.map((currentChat) =>{
                // console.log(currentChat)  
                if(currentChat.id === newChat.id) return newChat

                return currentChat
            }))

        }

        pusherClient.bind('chat:new', chatHandler)
        pusherClient.bind('chat:update', updateChatHandler)

        return () =>{
            pusherClient.unsubscribe(chatId)
            pusherClient.unbind('chat:new', chatHandler)
            pusherClient.unbind('chat:update', updateChatHandler)

        }
    }, [chatId])
    

    return (
        <div className="flex-1 overflow-y-auto">
            {
                chat.map((chatItem, i) => (
                    <ChatItemBox 
                        key={i}
                        isLast={ i === chat.length - 1}
                        data={chatItem}
                        user={user}
                    />
                ))
            }
            <div ref={bottomRef} className="pt-24"/>
        </div>
    )
}

export default Body