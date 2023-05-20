import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSidebar from "./DesktopSidebar"
import MobileSidebar from "./MobileSidebar"

async function Sidebar({children}: {children: React.ReactNode}) {
    const currentUser = await getCurrentUser()

    return (
        <div className="h-full">
            <DesktopSidebar user = {currentUser!}/>
            <MobileSidebar/>
            <main className="
                h-full
                lg:pl-20
            ">
                {children}
            </main>
        </div>
    )
}

export default Sidebar