import getChatById from "@/app/actions/getChatById";
import getMessages from "@/app/actions/getMessage";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import FormChat from "./components/FormChat";

interface chatParams {
    chatId: string;
}


const chatId = async({params}: {params: chatParams}) => {
    const chat = await getChatById(params.chatId)
    const messages = await getMessages(params.chatId)

    if (!chat){
        return (
            <div className="h-full lg:pl-80">
                <div className="flex flex-col h-full">
                    <EmptyState/>
                </div>
            </div>
        )
    }
    
    return ( 
        <div className="h-full lg:pl-80">
            <div className="flex flex-col h-full">
                <Header chat={chat}/>
                <Body initialChat = {messages} user={chat}/>
                <FormChat/>
            </div>
        </div>
    );
}
 
export default chatId;