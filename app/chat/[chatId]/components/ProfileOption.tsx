'use client'

import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import { Fragment, useMemo, useState } from "react"
import { format } from "date-fns"
import { Dialog, Transition } from "@headlessui/react"
import { IoClose, IoTrashOutline } from "react-icons/io5"
import Avatar from "@/app/components/avatar/Avatar"
import ModalDialog from "./ModalDialog"
import AvatarGroup from "@/app/components/avatar/AvatarGroup"
import useActiveUser from "@/app/hooks/useActiveUser"

interface ProfileOptionProps{
    isOpen: boolean,
    onClose: () => void
    data: Conversation & {
        users: User[]
    }
}

const ProfileOption: React.FC<ProfileOptionProps> = ({isOpen, onClose, data}) => {
    const otherUser = useOtherUser(data)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {members} = useActiveUser()
    const isUserActive = members.indexOf(otherUser?.email!) !== -1
    
    const joinDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    },[otherUser.createdAt])

    const createdGroup = useMemo(() => {
        return format(new Date(data.createdAt), 'PP')
    },[data.createdAt])


    const title = useMemo(() =>{
        return data.name || otherUser.name
    }, [data.name, otherUser.name])

    const statusText = useMemo(() =>{
        if(data.isGroup) return `${data.users.length} members`

        return isUserActive ? "Online" : "Offline"
    },[data, isUserActive])

    return (
        <>
            <ModalDialog 
                isOpen = {isModalOpen} 
                onClose={() => setIsModalOpen(false)}
            />
                {/* <div className="
                    p-4 
                    bg-white
                ">
                    <p>Modal</p>
                </div> */}
            {/* </ModalDialog> */}
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={onClose}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="
                            fixed 
                            inset-0 
                            bg-black
                            bg-opacity-40 
                        "/>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="
                                fixed
                                flex
                                right-0
                                max-w-full
                                inset-y-0
                                pl-10
                                pointer-events-none
                            ">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="
                                        w-screen
                                        max-w-md
                                        pointer-events-auto
                                    ">
                                        <div className="
                                            flex
                                            flex-col
                                            h-full
                                            py-6
                                            overflow-y-scroll
                                            shadow-xl
                                            bg-white
                                        ">
                                            <div className="px-4 sm:px-6">
                                                <div className="
                                                    flex
                                                    justify-end
                                                    items-start
                                                ">
                                                    <div className="
                                                        flex
                                                        items-center
                                                        ml-3
                                                        h-7
                                                    ">
                                                        <button
                                                            type="button"
                                                            className="
                                                                round-md
                                                                bg-white
                                                                text-gray-400
                                                                hover:text-gray-500
                                                                focus:outline-none
                                                                focus:ring-2
                                                                focus:ring-offset-2
                                                                focus:ring-sky-500
                                                            "
                                                            onClick={onClose}
                                                        >
                                                            <span className="sr-only">Close</span>
                                                            <IoClose size={24}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="
                                                relative
                                                flex-1
                                                mt-6
                                                px-4
                                                sm:px-6
                                            ">
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-2">
                                                    {
                                                        data.isGroup 
                                                        ? <AvatarGroup users ={data.users}/>
                                                        : <Avatar userImage={otherUser}/>
                                                    }
                                                    </div>
                                                    <div>{title}</div>
                                                    <div className="text-sm text-gray-">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <div 
                                                            className="
                                                                flex
                                                                items-center
                                                                flex-col
                                                                gap-3
                                                                cursor-pointer
                                                                hover:opacity-75
                                                            "
                                                            onClick={() => setIsModalOpen(true)}
                                                            >
                                                                <div className="
                                                                    flex
                                                                    justify-center
                                                                    items-center
                                                                    w-10
                                                                    h-10
                                                                    rounded-full
                                                                    bg-neutral-100
                                                                ">
                                                                    <IoTrashOutline size={20}/>
                                                                </div>
                                                                <div className="
                                                                    text-sm 
                                                                    font-light 
                                                                    text-neutral-600">
                                                                        Delete
                                                                </div>

                                                        </div>
                                                    </div>
                                                    <div className="
                                                        w-full
                                                        py-5
                                                        sm:px-0
                                                        sm:pt-0
                                                    ">
                                                        <dl className="
                                                            px-4
                                                            space-y-8
                                                            sm:space-y-6
                                                            sm:px-6
                                                        ">
                                                       
                                                            <div>
                                                                <dt className="
                                                                    text-sm
                                                                    font-medium
                                                                    text-gray-500
                                                                    sm:w-40
                                                                    sm:flex-shrink-0
                                                                ">
                                                                    { data.isGroup 
                                                                      ? "Member"
                                                                      : "Email"
                                                                    }
                                                                </dt>
                                                                <dd className="
                                                                    mx-1
                                                                    text-sm
                                                                    text-gray-900
                                                                    sm:col-span-2
                                                                ">
                                                                    { data.isGroup 
                                                                      ? <>
                                                                      {
                                                                        data.users.map((user, i) => (
                                                                            <div key={i} className="
                                                                                flex
                                                                                gap-3
                                                                                justify-start
                                                                                items-center
                                                                                mt-3
                                                                            ">
                                                                                <Avatar userImage ={user}/>
                                                                                <p>{user.name}</p>
                                                                            </div>
                                                                        ))
                                                                      }
                                                                        </>
                                                                      
                                                                      
                                                                      : otherUser.email
                                                                    }
                                                                </dd>
                                                            </div>
                                                            
                                                            <hr/>
                                                            <div>
                                                                <dt className="
                                                                    tex-sm
                                                                    font-medium
                                                                    text-gray-500
                                                                    sm:w-40
                                                                    sm:flex-shrink-0
                                                                ">
                                                                    { data.isGroup ? "Created" : "Joined" }
                                                                </dt>
                                                                <dd className="
                                                                    mt-1
                                                                    text-sm
                                                                    text-gray-900
                                                                    sm:col-span-2
                                                                ">
                                                                    {   data.isGroup 
                                                                        ?   <time dateTime={createdGroup}>
                                                                                {createdGroup}
                                                                            </time>
                                                                        :   <time dateTime={joinDate}>
                                                                                {joinDate}
                                                                            </time>
                                                                    }
                                                                    
                                                                </dd>
                                                            </div>
                                                        

                                                        </dl>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileOption