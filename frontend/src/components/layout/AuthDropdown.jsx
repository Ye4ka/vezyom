import Dropdown from "../ui/Dropdown"
import { Link } from "react-router-dom"
import { User, LogOut } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const AuthDropdown = () => {
    const { user, logout } = useAuth()

    return (
        <Dropdown
            align="right"
            trigger={({ open }) => (
                <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${open ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'
                        }`}
                >
                    {user ? (
                        <span className="text-primary font-bold text-sm">{user.name[0].toUpperCase()}</span>
                    ) : (
                        <User className={`w-5 h-5 transition-colors ${open ? 'text-primary' : 'text-text-muted'}`} />
                    )}
                </button>
            )}
        >
            {({ close }) => (
                <div className="w-56 rounded-md bg-surface border border-border shadow-lg">
                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                onClick={close}
                                className="block px-4 py-3 border-b border-border hover:bg-primary/5 transition-colors"
                            >
                                <p className="text-sm font-semibold text-text truncate">{user.name}</p>
                                <p className="text-xs text-text-muted mt-0.5">Личный кабинет</p>
                            </Link>
                            <ul className="py-2">
                                <li>
                                    <button
                                        onClick={() => {
                                            logout()
                                            close()
                                        }}
                                        className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-danger hover:bg-danger hover:text-white transition"
                                    >
                                        <LogOut size={16} />
                                        Выйти
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ul className="py-2">
                            <li>
                                <Link
                                    to="/login"
                                    onClick={close}
                                    className="block px-4 py-2 text-sm text-text hover:bg-primary hover:text-white transition"
                                >
                                    Войти
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    onClick={close}
                                    className="block px-4 py-2 text-sm text-text hover:bg-primary hover:text-white transition"
                                >
                                    Регистрация
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </Dropdown>
    )
}

export default AuthDropdown