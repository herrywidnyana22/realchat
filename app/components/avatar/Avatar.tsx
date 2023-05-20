'use client'

import useActiveUser from "@/app/hooks/useActiveUser";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps{
    userImage?: User
}

const Avatar: React.FC<AvatarProps> = ({userImage}) => {
    const { members } = useActiveUser()

    const isActive = members.indexOf(userImage?.email!) !== -1
    return ( 
        <div className="relative">
            <div className="
                relative
                flex
                items-center
                rounded-full
                overflow-hidden
                w-10
                h-10
                md:w-11
                md:h-11
            ">
                <Image
                    src={userImage?.image || '/images/placeholder_profile.png'}
                    alt="Profile Image"
                    fill
                    sizes="40"
                />
            </div>
            {/* dot online status */}
            { isActive && 
                <span 
                    className="
                        absolute
                        block
                        w-2
                        h-2
                        rounded-full
                        top-0
                        right-0
                        bg-green-500
                        ring-white
                        ring-2
                        md:w-3
                        md:h-3
                    "
                />
            }
        </div>
     );
}
 
export default Avatar;