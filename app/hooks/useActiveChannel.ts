import { useEffect, useState } from "react"
import { Channel, Members } from "pusher-js"
import { pusherClient } from "../libs/pusher"
import useActiveUser from "./useActiveUser"

const useActiveChannel = () => {
    const { set, add, remove } = useActiveUser()
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

    useEffect(() =>{
        let channel = activeChannel

        if(!channel) {
            channel = pusherClient.subscribe('presence-messanger')
            setActiveChannel(channel)
        }

        channel.bind('pusher:subscription_succeeded', (members: Members) => {
            const initMembers: string[] = []

            members.each((member: Record<string, any>) => initMembers.push(member.id))
            set(initMembers)
        })

        channel.bind('pusher:member_added', (member: Record<string, any>) =>{
            add(member.id)
        })

        channel.bind('pusher:member_removed', (member: Record<string, any>) =>{
            remove(member.id)
        })

        return() =>{
            if(activeChannel){
                pusherClient.unsubscribe('presence-messanger')
                setActiveChannel(null)
            }
        }

    },[activeChannel, add, set, remove])
}

export default useActiveChannel