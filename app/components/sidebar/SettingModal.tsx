// 'use client'

import axios from "axios"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import Modal from "../Modal"
import Input from "../input/Input"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import Button from "../Button"

interface SettingModalProps{
    user: User
    isOpen?: boolean
    onClose:() => void
}

const SettingModal: React.FC<SettingModalProps> = ({user, onClose, isOpen}) => {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues:{
            name: user?.name,
            image: user?.image
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) =>{
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        axios.post('/api/setting', data)
        .then(() => {
            route.refresh()
            onClose()
        })
        .catch(() => toast("Something error..."))
        .finally(() => setIsLoading(false))
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                        ">
                            Profile
                        </h2>
                        <p className="
                            mt-1
                            text-sm
                            leading-6
                            text-gray-600
                        ">
                            Edit your profile
                        </p>
                        <div className="
                            flex
                            flex-col
                            gap-y-8
                            mt-10
                        ">
                            <Input
                                id="name" 
                                label="Name"
                                errors={errors}
                                required
                                register={register}
                                disabled={isLoading}
                            />
                            <div>
                                <label className="
                                    block
                                    text-sm
                                    font-medium
                                    leading-6
                                    text-gray-900
                                ">
                                    Photo
                                </label>
                                <div className="
                                    flex
                                    items-center
                                    gap-x-3
                                    mt-2
                                ">
                                    <Image 
                                        src={image || user?.image || '/images/placeholder_profile.png'}
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        alt="Profile photo"
                                    />
                                    <CldUploadButton
                                        options={{maxFiles: 1}}
                                        onUpload={handleUpload}
                                        uploadPreset='dbiib8aq' 
                                    >
                                        <Button
                                            type="button"
                                            secondary
                                            disabled={isLoading}
                                        >
                                            Change
                                        </Button>

                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="
                        flex
                        justify-end
                        items-center
                        gap-x-4
                        mt-6
                    ">
                        <Button
                            onClick={onClose}
                            secondary
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>

        </Modal>
    )
}

export default SettingModal