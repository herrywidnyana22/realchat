'use client'

import useConversation from '@/app/hooks/useChat'
import axios from 'axios'
import React from 'react'
import ChatInput from './ChatInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlinePhoto, HiPaperAirplane } from 'react-icons/hi2'
import { CldUploadButton } from 'next-cloudinary'

const FormChat = () => {
    const { chatId } = useConversation()

    const{
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues:{
            chat: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setValue('chat', '', { shouldValidate: true })

        axios.post("/api/message", {
            ...data,
            chatId: chatId
        })
    }

    const handleUpload = (result: any) => {
        axios.post("/api/message", {
            image: result?.info?.secure_url,
            chatId
        })
    }

    return (
        <div className="
            flex
            items-center
            gap-2
            w-full
            px-4 py-5
            border-t
            bg-white
            lg:gap-4
        ">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                //cloudinary > setting > upload > upload preset , add Upload preset > set unsigned > save > copy name
                uploadPreset='dbiib8aq'
                onUpload={handleUpload}
            >
                <HiOutlinePhoto size={30} className='text-sky-500'/>
            </CldUploadButton>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="
                    flex
                    items-center
                    gap-2
                    w-full
                    lg:gap-4
                "
            >
                <ChatInput 
                    id= "chat"
                    register={register}
                    error={errors}
                    placeholder="Write a message"
                    required
                />
                <button type='submit' className="
                    rounded-full
                    p-2
                    cursor-pointer
                    bg-sky-500
                    hover:bg-sky-600
                    transition
                ">
                    <HiPaperAirplane size={18} className="text-white"/>
                </button>
            </form>
        </div>
    )
}

export default FormChat
