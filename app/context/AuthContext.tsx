'use client'

import { SessionProvider } from "next-auth/react"

interface AuthContextProp{
    children: React.ReactNode
}

export default function AuthContext({children}: AuthContextProp){
    return <SessionProvider>{children}</SessionProvider>
}