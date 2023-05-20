'use client'

import clsx from "clsx"
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps{
    label: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    disabled?: boolean
}

const Input:React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        <div> 
            <label htmlFor={id} className="
                block
                leading-6
                font-medium
                text-sm
                text-gray-900
            ">
                {label}
                <div className="mt-2">
                    <input 
                        id={id}                    
                        type={type}
                        autoComplete={id}
                        disabled={disabled}
                        {...register(id, { required })}
                        className={clsx(`
                            form-input
                            w-full
                            block
                            rounded-md
                            border-0
                            py-1.5
                            text-gray-900
                            shadow-sm
                            ring-1
                            ring-inset
                            ring-gray-300
                            focus:ring-sky-600
                            sm:text-sm
                            sm:loading-6`,
                            errors[id] && "focus:ring-rose-500",
                            disabled && "opacity-50 cursor-default"
                            
                        )}
                    />
                </div>
            </label>
        </div>
    )
}

export default Input