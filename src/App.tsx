import * as React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet, useLocation } from "react-router-dom"


const App = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        import('./pages/Login')
        import('./pages/Signup')
        import('./pages/HomePage')
        import('./pages/Explore')
        import('./pages/AboutUs')
        import('./pages/Pricing')
        if(pathname == '/pricing'){
            import('./pages/PurchasePlan')
        }
    }, [pathname])

    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default React.memo(App)