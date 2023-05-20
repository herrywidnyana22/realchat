'use client'

import Button from "@/app/components/Button"
import Modal from "@/app/components/Modal"
import Input from "@/app/components/input/Input"
import Select from "@/app/components/input/Select"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

interface GroupChatModalProps{
  user: User[]
  isOpen?: boolean
  onClose: () => void
} 

const GroupChatModal: React.FC<GroupChatModalProps> = ({isOpen, onClose, user}) => {

  const route = useRouter()
  const[isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{errors}

  } = useForm<FieldValues>({
    defaultValues:{
      name: "",
      members: []
    }
  })

  const member = watch('members')
  const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    setIsLoading(true)
    
    axios.post("/api/chat", {
      ...data,
      isGroup: true
    })
    .then(() => {
      route.refresh()
      onClose()
    })

    .catch(() => toast.error("Something error.."))
    .finally(() => setIsLoading(false))
  }

  return (
    <Modal
      isOpen= {isOpen}
      onClose={onClose}
    >
      <form 
        onSubmit={handleSubmit(onSubmit)}
      >
          <div className="space-y-12">
            <div className="border-b border-gray-900/100 pb-12">
              <h2 className="
                text-base
                font-semibold
                leading-7
                text-gray-900
              ">
                Create a group chat
              </h2>
              <p className="
                text-sm
                leading-6
                mt-1
                text-gray-600
              ">
                Create a chat with 2 or more people
              </p>
              <div className="
                flex
                flex-col
                gap-y-8
                mt-10
              ">
                <Input
                  register={register}
                  id="name"
                  label="Name"
                  disabled={isLoading}
                  required
                  errors={errors}
                />
                <Select
                  disabled={isLoading} 
                  label="Member"
                  options={ user.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  onChange={(value) => setValue('members', value, {
                    shouldValidate: true
                  })}
                  value={member}
                />
              </div>
            </div>
          </div>
          <div className="
            flex
            justify-end
            items-center
            gap-x-6
            mt-6
          ">
            <Button
              disabled={isLoading}
              type="button"
              secondary
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              disabled={isLoading}
              type="submit"

            >
              Create
            </Button>
          </div>        
      </form>
    </Modal>
  )
}

export default GroupChatModal