'use client'

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { IoClose } from "react-icons/io5"

interface ModalProps{
    isOpen?: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal:React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    return (
        <Transition.Root
            show={isOpen}
            as={Fragment}
        >
            <Dialog
                as="div"
                className="relative z-50"
                onClose={onClose}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="
                        fixed
                        inset-0
                        transition-opacity
                        bg-opacity-75
                        bg-gray-500
                    "/>
                </Transition.Child>
                <div className="
                    fixed
                    inset-0
                    z-10
                    overflow-y-auto
                ">
                    <div className="
                        flex
                        justify-center
                        items-center
                        min-h-full
                        p-4
                        text-center
                        sm:p-0
                    ">
                        <Transition.Child 
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
                        >
                            <Dialog.Panel className="
                                relative
                                w-full
                                px-4 pb-4
                                transform
                                overflow-hidden
                                rounded-lg
                                bg-white
                                text-left
                                shadow-xsl
                                transition-all
                                sm:my-8
                                sm:w-full
                                sm:max-w-lg
                                sm:p-6
                            ">
                                <div className="
                                    absolute
                                    top-0
                                    right-0
                                    pr-4
                                    pt-4
                                    hidden
                                    z-10
                                    sm:block
                                ">
                                    <button
                                        type="button"
                                        className="
                                            rounded-md
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
                                {children}
                            </Dialog.Panel>

                        </Transition.Child>
                    </div>
                </div>
            </Dialog>

        </Transition.Root>
    )
}

export default Modal