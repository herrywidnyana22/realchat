'use client'

import Avatar from "@/app/components/avatar/Avatar"
import clsx from "clsx"
import Image from "next/image"
import { FullChatType, FullConversationType } from "@/app/types"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { MdDoneAll } from "react-icons/md"
import { Conversation, User } from "@prisma/client"
import { useState } from "react"
import ImageModal from "./ImageModal"

interface ChatItemBoxProps{
  data: FullChatType
  isLast?: boolean
  user: Conversation & {
    users: User[]
  }
} 

const ChatItemBox: React.FC<ChatItemBoxProps> = ({data, isLast, user}) => {
  const session = useSession()
  const[imageModalOpen, setImageModalOpen] = useState(false)

  const isOwnChat = session?.data?.user?.email  === data?.sender?.email
  const seenList = (data.seen || [])
                  .filter((user) => user.email !== data?.sender?.email)
                  .map((user) => user.name)
                  .join(', ')

  // chat seen if length = 2 (sender and target)
  const isSeen = data.seen

  const container = clsx("flex gap-3 p-4", isOwnChat && "justify-end")
  
  const avatar = clsx(isOwnChat && "order-2")
  const body = clsx("flex flex-col gap-2", isOwnChat && "items-end")
  const chatItem = clsx(
    "w-fit overflow-hidden text-sm", 
    isOwnChat ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full px-3 py-2"
  )

  

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar userImage={data.sender}/>
      </div>
      <div className={body}>
        <div className="
          flex
          items-center
          gap-1
        ">
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-gray-400 text-xs">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        
        <div className={chatItem}>
          <ImageModal 
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {
            data.image 
            ? (<Image 
                alt="image message"
                height={280}
                width={280}
                src = {data.image}
                className="
                  object-cover
                  hover:scale-110
                  cursor-pointer
                  transition
                  translate
                "
                onClick={() => setImageModalOpen(true)}
              />)
            : <div>{data.body}</div>
          }
        </div>
        {isLast && isOwnChat && seenList.length > 0 &&
          <div className="
            text-xs
            font-light
            text-gray-500
          ">
            {`Seen by ${seenList}`}
          </div>
        }
      </div>
    </div>
  )
}

export default ChatItemBox