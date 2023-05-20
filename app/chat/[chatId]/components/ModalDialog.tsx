'use client'

import Button from "@/app/components/Button"
import Modal from "@/app/components/Modal"
import useChat from "@/app/hooks/useChat"
import axios from "axios"
import { Dialog } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "react-hot-toast"
import { FiAlertTriangle } from "react-icons/fi"

interface ModalDialogProps{
    isOpen?: boolean
    onClose: () => void
}

const ModalDialog: React.FC<ModalDialogProps> = ({isOpen, onClose}) => {
    const route = useRouter()
    const { chatId } = useChat()
    const[isLoading, setIsLoading] = useState(false)

    const onDelete = useCallback(() =>{
        setIsLoading(true)

        axios.delete(`/api/chat/${chatId}`)
        .then(() =>{
            onClose()
            route.push("/chat")
            route.refresh()
        })
        .catch(() => toast.error("Something Error!"))
        .finally(() => setIsLoading(false)) 

    },[chatId, route, onClose])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="
                    flex
                    justify-center
                    items-center
                    flex-shrink-0
                    w-12
                    h-12
                    mx-auto
                    rounded-full
                    bg-red-100
                    sm:mx-0
                    sm:w-10
                    sm:h-10
                ">
                    <FiAlertTriangle className="
                        w-6
                        h-6
                        text-red-600
                    "/>
                </div>
                <div className="
                    text-center
                    mt-3
                    sm:ml-4
                    sm:mt-0
                    sm:text-left
                ">
                    <Dialog.Title
                        as="h3"
                        className="
                            text-base
                            font-semibold
                            leading-6
                            text-gray-900
                        "
                    >
                        Delete Chat
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure to delete this chat?
                            <span className="font-bold"> all members will lost the messages</span>,
                            this action cannot be undone.
                        </p>
                    </div>

                </div>
            </div>

            {/* Button Group */}
            <div className="
                mt-5
                sm:mt-4
                sm:flex
                sm:flex-row-reverse
            ">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default ModalDialog