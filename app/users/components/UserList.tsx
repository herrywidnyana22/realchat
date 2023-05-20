'use client'

import UserBox from "./UserBox"
import {User} from "@prisma/client"

interface UserListProps{
    userlist: User[]
}

const UserList: React.FC<UserListProps> = ({userlist}) => {
  return (
    <aside className="
        fixed
        block
        w-full
        left-0
        inset-y-0
        pb-20
        overflow-y-auto
        border-r
        border-gray-200
        bg-white
        lg:block
        lg:w-80
        lg:left-20
        lg:pb-0
    ">
        <div className="px-5">
            <div className="flex-col">
                <div className="
                    py-4
                    font-bold
                    text-xl
                    mb-2
                    text-neutral-800
                ">
                    People Around You
                </div>
            </div>
            { 
                userlist.map((item, i) => (
                    <UserBox
                        key={i}
                        data={item}
                    />
                ))

            }
        </div>
    </aside>
  )
}

export default UserList