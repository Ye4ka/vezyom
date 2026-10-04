import { Link } from "react-router-dom"
import { SearchX } from "lucide-react"
import { usePageTitle } from "../hooks/usePageTitle"

export default function NotFound() {
    usePageTitle("Страница не найдена")
    return (
        <div className="max-w-md mx-auto px-4 mt-24 pb-20 text-center">
            <SearchX className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Страница не найдена</h1>
            <p className="text-text-muted mb-6">
                Такой страницы нет - возможно, ссылка устарела или адрес введён с ошибкой
            </p>
            <Link
                to="/"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
                На главную
            </Link>
        </div>
    )
}