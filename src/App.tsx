/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { ScrollArea } from "./components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { fetchUserDetails } from "./lib/AxiosCalls"
import { Toaster } from "./components/ui/sonner"
import HomeLoader from "./components/HomeLoader"

const App = () => {
    const { pathname } = useLocation();
    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | 'notauthorized'>('notauthorized')
    const [isLoaded, setIsLoaded] = React.useState(false)
    const token = localStorage.getItem('astraToken');

    React.useEffect(() => {
        if (document.readyState === 'complete') {
            document.fonts.ready.then(() => {
                setIsLoaded(true);
            }).catch(err => {
                console.error('Font loading failed:', err);
                setIsLoaded(true); // Set to true anyway to not block the UI
            });
            // } else {
            //     window.addEventListener('load', () => {
            //         setIsLoaded(true);
            //     });
        }

        return () => {
            window.removeEventListener('load', () => {
                setIsLoaded(true);
            });
        };

    }, []);

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

        if (pathname == '/explore' && isAuthenticated && window.innerWidth > 800) {
            setOpenSidebar(true)
        } else setOpenSidebar(false)
    }, [pathname, isAuthenticated])

    const { data: userData, isError } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => fetchUserDetails(token),
        enabled: !!token,
        refetchOnWindowFocus: false
    })

    console.log("isAuthenticated: ", isAuthenticated);

    React.useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            setIsLoaded(true);
        } else if (token && isAuthenticated != true && userData) {
            setIsAuthenticated(true);
            setIsLoaded(true);
        };
    }, [userData, token])

    React.useEffect(() => {
        if (isError) {
            setIsAuthenticated(false)
            localStorage.removeItem('astraToken');
            localStorage.removeItem('job_id');
            localStorage.removeItem('audioLinks');
            localStorage.removeItem('isGenerating');
        }
    }, [isError])

    return (<>
        <div className={(isAuthenticated == 'notauthorized' || !isLoaded) ? 'w-full h-screen flex justify-center items-center relative z-[1000] bg-[#252322]' : 'hidden'}>
            <HomeLoader />
        </div>
        <main
            data-sidebaropen={(openSidebar && isAuthenticated == true) ? 'true' : 'false'}
            data-authenticated={`${isAuthenticated}`}
            data-loaded={isLoaded}
            className={`group h-screen flex justify-between relative overflow-hidden opacity-0 ${(isLoaded == true && isAuthenticated != 'notauthorized') ? 'opacity-100' : 'opacity-0'}`}
        >
            <Toaster
                theme="dark"
                className="bg-purple"
            />
            {isAuthenticated && (
                <div className='group-data-[sidebaropen=true]:w-[230px] group-data-[sidebaropen=false]:w-0 duration-200 h-screen sticky z-[200] top-0 left-0 overflow-hidden'>
                    <ScrollArea className="w-full min-w-[230px] h-full overflow-auto">
                        <Sidebar />
                    </ScrollArea>
                </div>
            )}
            <div className="flex-grow h-screen flex flex-col overflow-hidden">
                <div className="w-full flex-grow overflow-auto flex flex-col" autoFocus>
                    <Header userDetails={userData} />
                    <div className="flex justify-center items-center flex-grow">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    </>)
}

export default React.memo(App)