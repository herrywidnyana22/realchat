'use client'

import { useState } from "react";
import { User } from "@prisma/client";

import useRoute from "@/app/hooks/useRoute";
import DesktopItem from "./DesktopItem";
import Avatar from "../avatar/Avatar";
import SettingModal from "./SettingModal";

interface DekstopSidebarProps {
    user: User
}

const DesktopSidebar: React.FC<DekstopSidebarProps> = ({user}) => {
    const menuItem = useRoute()
    const [isOpen, setIsOpen] = useState(false)

    return ( 
        <>
            <SettingModal 
                user={user}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="
                lg:fixed
                lg:flex
                lg:flex-col
                lg:inset-y-0
                lg:left-0
                lg:z-40
                lg:w-20
                lg:overflow-y-auto
                lg:border-r-[1px]
                lg:pb-4
                lg:bg-white

                justify-between
                xl:px-6
                hidden
            ">
                <nav className="
                    flex
                    flex-col
                    justify-between
                    mt-4
                ">
                    <ul role="list" className="
                        flex
                        flex-col
                        items-center
                        space-y-1
                    ">
                        { menuItem.map((item, i) => (
                            <DesktopItem
                                key={i}
                                label={item.label}
                                href={item.href}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onClick}
                            />
                        ))}

                    </ul>
                </nav>
                <nav className="
                    flex
                    flex-col
                    justify-between
                    items-center
                    mt-4
                ">
                    <div 
                        className="
                            hover:opacity-75
                            cursor-pointer
                            transition
                        "
                        onClick={() => setIsOpen(true)}
                    >
                        <Avatar userImage={user}/>
                    </div>
                </nav>
                
            </div>
        </>
     );
}
 
export default DesktopSidebar;