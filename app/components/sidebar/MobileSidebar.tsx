'use client'

import useConversation from "@/app/hooks/useChat";
import useRoute from "@/app/hooks/useRoute";
import MobileItem from "./MobileItem";

const MobileSidebar = () => {
    const menuItem = useRoute()
    const { isOpen } = useConversation()

    if (isOpen){
        return null
    }

    return ( 
        <div className="
            fixed
            flex
            flex-row-reverse
            justify-center
            items-center
            w-full
            bottom-0
            z-40
            border-t-[1px]
            bg-white
            lg:hidden
        ">
        {
            menuItem.map((item, i) => (
                <MobileItem
                    key={i}
                    active={item.active}
                    icon={item.icon}
                    href={item.href}
                    onClick={item.onClick}
                />
            ))
        }
        </div>
    );
}
 
export default MobileSidebar;