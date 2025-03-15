import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Test from './pages/Test'
const App = React.lazy(() => import('./App'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Explore = React.lazy(() => import('./pages/Explore'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const PurchasePlan = React.lazy(() => import('./pages/PurchasePlan'));
const FAQs = React.lazy(() => import('./pages/FAQs'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const NavigateBack = React.lazy(() => import('./components/NavigateBack'));

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <React.Suspense fallback={<div></div>}>
                <App />
            </React.Suspense>
        ),
        children: [
            {
                path: '/',
                element: (
                    <React.Suspense fallback={<div></div>}>
                        <HomePage />
                    </React.Suspense>
                )
            },
            {
                path: '/explore',
                element: (
                    <React.Suspense fallback={<div></div>}>
                        <Explore />
                    </React.Suspense>
                )
            },
            {
                path: '/about',
                element: (
                    <React.Suspense fallback={<div></div>}>
                        <AboutUs />
                    </React.Suspense>
                )
            },
            {
                path: '/contact-us',
                element: (
                    <React.Suspense fallback={<div></div>}>
                        <ContactUs />
                    </React.Suspense>
                )
            },
            {
                path: '/pricing',
                element: (
                    <React.Suspense fallback={<div></div>}>
                        <Pricing />
                    </React.Suspense>
                )
            },
            {
                path: '/purchase',
                element: (
                    <React.Suspense fallback={<div></div>}>
                        <PurchasePlan />
                    </React.Suspense>
                )
            },
            {
                path: '/faqs',
                element: (
                    <React.Suspense fallback={<div></div>}>
                        <FAQs />
                    </React.Suspense>
                )
            },
        ]
    },
    {
        path: '/login',
        element: (
            <React.Suspense fallback={<div></div>}>
                <div>
                    <NavigateBack />
                    <Login />
                </div>
            </React.Suspense>
        )
    },
    {
        path: '/sign-up',
        element: (
            <React.Suspense fallback={<div></div>}>
                <div>
                    <NavigateBack />
                    <Signup />
                </div>
            </React.Suspense>
        )
    },
    {
        path: '/test',
        element: (
            <React.Suspense fallback={<div></div>}>
                <Test />
            </React.Suspense>
        )
    },
])

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)
