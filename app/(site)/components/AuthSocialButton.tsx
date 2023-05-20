'use client'

import { IconType } from 'react-icons'

interface LoginSocialButtonProps{
    icon: IconType
    onClick: () => void
}

const AuthSocialButton: React.FC<LoginSocialButtonProps> = ({icon: Icon, onClick}) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className="
          w-full
          inline-flex
          justify-center
          rounded-md
          bg-white
          px-4
          py-2
          text-gray-500
          shadow-sm
          ring-1
          ring-inset
          ring-gray-100
          hover:bg-gray-300
          focus:outline-offset-0
        "
    >
        <Icon/>
    </button>
  )
}

export default AuthSocialButton