import * as React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { ScrollArea } from "./components/ui/scroll-area"


const App = () => {
    const { pathname } = useLocation();
    const [openSidebar, setOpenSidebar] = React.useState(true)

    React.useEffect(() => {
        import('./pages/Login')
        import('./pages/Signup')
        import('./pages/HomePage')
        import('./pages/Explore')
        import('./pages/AboutUs')
        import('./pages/Pricing')
        if (pathname == '/pricing') {
            import('./pages/PurchasePlan')
        }
    }, [pathname])

    return (
        <main data-sidebaropen={openSidebar ? 'true' : 'false'} className="min-h-screen flex justify-between relative group">
            <div className='group-data-[sidebaropen=true]:w-[280px] group-data-[sidebaropen=false]:w-0 duration-200 h-screen sticky z-[200] top-0 left-0 overflow-hidden'>
                <ScrollArea className="w-full min-w-[280px] h-full overflow-auto bg-red-700">
                    <Sidebar setOpenSidebar={setOpenSidebar} />
                </ScrollArea>
            </div>
            <div className="flex-grow min-h-screen flex flex-col">
                <Header setOpenSidebar={setOpenSidebar} />
                <Outlet />
                <Footer />
            </div>
        </main>
    )
}

export default React.memo(App)