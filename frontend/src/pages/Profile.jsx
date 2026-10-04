import { Link } from "react-router-dom"
import { User } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Profile() {
    const { user } = useAuth()

    if (!user) {
        return (
            <div className="max-w-md mx-auto px-4 mt-20 pb-20 text-center">
                <p className="text-text-muted mb-4">Нужно войти, чтобы увидеть личный кабинет</p>
                <Link to="/login" className="text-primary hover:underline">
                    Войти
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto px-4 mt-20 pb-20 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-text-muted">Личный кабинет скоро появится - здесь будет история заказов, адреса и настройки профиля</p>
        </div>
    )
}