import getAllUsers from "../actions/getUser"
import Sidebar from "../components/sidebar/Sidebar"
import UserList from "./components/UserList"

export default async function UserLayout({children}: {children: React.ReactNode}) {
    const allUser = await getAllUsers()


    return(
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <UserList userlist ={allUser} />
                {children}
            </div>
        </Sidebar>
    )
}