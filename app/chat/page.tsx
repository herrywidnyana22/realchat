'use client'

import clsx from "clsx"
import useConversation from "../hooks/useChat"
import EmptyState from "../components/EmptyState"

const Home = () => {
    const { isOpen } = useConversation()

    return ( 
        <div 
            className={clsx(`
                h-full
                lg-block`,
                isOpen ? 'block' : 'hidden'
            )}
        >
            <EmptyState/>
        </div>
    );
}
 
export default Home;