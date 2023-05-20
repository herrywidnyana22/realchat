import { Conversation, Chat, User } from "@prisma/client";

export type FullChatType = Chat & {
    sender: User,
    seen: User[]
}

export type FullConversationType = Conversation & {
    users: User[],
    chats: FullChatType[]
} 