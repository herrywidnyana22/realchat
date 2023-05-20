import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { signOut } from "next-auth/react";

import {
    HiChatBubbleOvalLeftEllipsis,
    HiUser,
    HiArrowLeftOnRectangle

} from 'react-icons/hi2'

import useConversation from "./useChat";

const useRoute = () => {
    const pathName = usePathname()
    const { chatId } = useConversation()

    const route = useMemo(() => [
        {
            label: 'Chat',
            href: '/chat',
            icon: HiChatBubbleOvalLeftEllipsis,
            active: pathName === '/chat' || !!chatId
        }, {
            label: 'User',
            href: '/users',
            icon: HiUser,
            active: pathName === '/users' 
        }, {
            label: 'Logout',
            href: '#',
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut() 
        }
        
    ],[pathName, chatId])
    
    return route
}
 
export default useRoute;