import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

function getInitialTheme() {
    const stored = localStorage.getItem("vezyom_theme")
    if (stored) return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("vezyom_theme", theme)
    }, [theme])

    return (
        <button
            onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}