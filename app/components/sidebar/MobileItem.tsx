'use client'

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps{
    active?: boolean
    href: string
    icon: any
    onClick?: () => void
}
const MobileItem: React.FC<MobileItemProps> = ({
    active, 
    href,
    icon: Icon,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link
            href={href}
            className={clsx(`
                flex
                justify-center
                group
                w-full
                gap-x-3
                p-4
                leading-6
                font-semibold
                text-sm
                text-gray-500
                hover:text-black
                hover:bg-gray-100`,
                active && "bg-gray-100 text-black"
            )}
            onClick={onClick}
        >
            <Icon clasname="w-6 h-6"/>
        </Link>
    );
}
 
export default MobileItem
