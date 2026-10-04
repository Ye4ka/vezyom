import { useState, useEffect } from "react"
import PageUp from "../../assets/icon/page-up.svg"

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    if (!visible) return null

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Наверх страницы"
            className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors z-40"
        >
            <img src={PageUp} alt="" className="w-5 h-5" />
        </button>
    )
}