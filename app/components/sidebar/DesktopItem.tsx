'use client'

import clsx from "clsx";
import Link from "next/link";

interface DekstopItemProps{
    active?: boolean
    label: string
    icon: any
    href: string
    onClick?: () => void
}

const DesktopItem: React.FC<DekstopItemProps> = ({
    active, 
    label,
    icon: Icon,
    href,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    return ( 
        <li onClick={handleClick}>
            <Link 
                href={href}
                className={clsx(`
                    flex
                    gap-x-3
                    group
                    rounded-md
                    p-3
                    leading-6
                    text-sm
                    text-gray-500
                    hover:text-black
                    hover:bg-gray-100`,
                    active && "bg-gray-100 text-black"
                )}
            >
                <Icon className="w-6 h-6 shrink-0"/>
                <span className="sr-only">{label}</span>
            </Link>
        </li>
     );
}
 
export default DesktopItem;