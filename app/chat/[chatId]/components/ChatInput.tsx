'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface chatInputProps{
    id: string
    type?: string
    placeholder?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    error: FieldErrors
}

const ChatInput: React.FC<chatInputProps> = ({
    id, type, placeholder, required, register, error}) => {

    return (
        <div className="
            relative
            w-full
        ">
            <input 
                type={type} 
                id={id}
                placeholder={placeholder}
                autoComplete={id}
                {...register(id, { required: required })}
                className="
                    w-full
                    rounded-full
                    text-black
                    font-light
                    px-4 py-2
                    bg-neutral-100
                    focus:outline-none
                "
            />
        </div>
    )
}

export default ChatInput