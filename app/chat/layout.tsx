import getChat from "../actions/getChat";
import getAllUsers from "../actions/getUser";
import Sidebar from "../components/sidebar/Sidebar";
import ChatList from "./components/ChatList";

export default async function ChatLayout({children}:{children: React.ReactNode}) {
    const chat = await getChat()
    const user = await getAllUsers()

    return(
        // @ts-expect-error Server Copmponent
        <Sidebar>
            <div className="h-full">
                <ChatList
                    user={user}
                    initialItems = {chat}
                />
                {children}
            </div>
        </Sidebar>
    )
}