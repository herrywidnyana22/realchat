'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarGroupProps{
    users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({users = []}) => {
    const sliceUser = users.slice(0, 3)
    const positionImage = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'
    }

    return (
        <div className="
            relative
            w-11
            h-11
        ">
            {
                sliceUser.map((user, i) => (
                    <div 
                        key={i}
                        className={`
                            absolute
                            inline-block
                            rounded-full
                            w-[21px]
                            h-[21px]
                            overflow-hidden
                            ${positionImage[i as keyof typeof positionImage]}
                        `}
                        >
                            <Image
                                alt="Avatar Group"
                                fill
                                src={user?.image || '/images/placeholder_profile.png'}
                                sizes="21"
                            />

                    </div>
                ))
            }
        </div>
    )
}

export default AvatarGroup