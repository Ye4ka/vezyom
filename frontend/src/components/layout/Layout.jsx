import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from "./ScrollToTop"
import ScrollToTopButton from "./ScrollToTopButton"

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Header />

            <main className="">
                <Outlet />
            </main>

            <Footer />
            <ScrollToTopButton />
        </div>
    )
}