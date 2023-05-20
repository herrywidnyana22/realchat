'use client'

import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { Conversation, Chat, User } from "@prisma/client"
import useOtherUser from "@/app/hooks/useOtherUser"
import Avatar from "@/app/components/avatar/Avatar"
import AvatarGroup from "@/app/components/avatar/AvatarGroup"

interface ChatBoxProps{
  data: FullConversationType
  selected?: boolean 
}

const ChatBox: React.FC<ChatBoxProps> = ({data, selected}) => {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const route = useRouter()

    const handleClick = useCallback(() => {
      route.push(`/chat/${data.id}`)
    }, [data.id, route])

    const lastChat = useMemo(() => {
      const chat = data.chats || []

      return chat[chat.length - 1]
    },[data.chats])

    const userMail = useMemo(() => {
      return session.data?.user?.email
    },[session.data?.user?.email])

    const hasSeen = useMemo(() => {
      if (!lastChat){
        return false
      }

      const seenChatArray = lastChat.seen || []

      if (!userMail){
        return false
      }

      return seenChatArray.filter((user) => user.email === userMail).length !== 0

    },[lastChat, userMail])

    const lastChatText = useMemo(() => {
      if(lastChat?.image){
        return "Sent an image"
      }

      if(lastChat?.body){
        return lastChat.body
      }

      return "Started a chat"

    },[lastChat])

    return (
      <div
        className={clsx(`
          relative
          flex
          items-center
          w-full
          space-x-3
          p-3
          rounded-lg
          transition
          cursor-pointer
          hover:bg-neutral-100`,
          selected ? "bg-neutral-100" : "bg-white"
      
        )}
        onClick={handleClick}
      >
        {
          data.isGroup 
          ? <AvatarGroup users ={data.users}/>
          : <Avatar userImage={otherUser}/>
        }
        
        <div className="flex-1 min-w-0">
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
              {data.name  || otherUser.name}
            </p>
            
          { lastChat?.createdAt && ( 
            <p className="
              text-xs
              text-gray-400
              font-light
            ">
            {
              format(new Date(lastChat.createdAt), "p")
            }
            </p>
          )}
          </div>
          <p className={clsx(`
            truncate
            text-sm`,
            hasSeen ? "text-gray-500 " : "text-black font-medium"
          )}>
            {lastChatText}
          </p>
        </div>
      </div>
    )
}

export default ChatBox