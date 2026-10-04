import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, CheckCircle } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { usePageTitle } from "../hooks/usePageTitle"

const initialValues = {
    identifier: "",
    password: "",
}

function validateField(name, value) {
    switch (name) {
        case "identifier":
            return value.trim() ? "" : "Введите email или логин"
        case "password":
            return value ? "" : "Введите пароль"
        default:
            return ""
    }
}

export default function Login() {
    usePageTitle("Вход")
    const navigate = useNavigate()
    const { login } = useAuth()
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(prev => ({ ...prev, [name]: value }))
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const allErrors = {
            identifier: validateField("identifier", values.identifier),
            password: validateField("password", values.password),
        }
        setErrors(allErrors)
        setTouched({ identifier: true, password: true })

        const hasErrors = Object.values(allErrors).some(Boolean)
        if (hasErrors) return

        login({ name: values.identifier })
        setSubmitted(true)
        setTimeout(() => navigate("/"), 1500)
    }

    if (submitted) {
        return (
            <div className="max-w-md mx-auto px-4 mt-20 pb-20 text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Вход выполнен!</h1>
                <p className="text-text-muted">Сейчас перенаправим тебя на главную...</p>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto px-4 mt-10 pb-20">
            <h1 className="text-3xl font-bold mb-2">Вход</h1>
            <p className="text-text-muted mb-8">Рады видеть тебя снова в «Везём»</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                    <label htmlFor="identifier" className="block text-sm font-semibold mb-1">
                        Email или логин
                    </label>
                    <input
                        id="identifier"
                        name="identifier"
                        type="text"
                        placeholder="you@example.com или ivan_ivanov"
                        value={values.identifier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 rounded-xl border bg-surface text-text focus:outline-none transition-colors ${
                            touched.identifier && errors.identifier
                                ? "border-danger"
                                : "border-border focus:border-primary"
                        }`}
                    />
                    {touched.identifier && errors.identifier && (
                        <p className="text-danger text-sm mt-1">{errors.identifier}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold mb-1">
                        Пароль
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Введи пароль"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 pr-12 rounded-xl border bg-surface text-text focus:outline-none transition-colors ${
                                touched.password && errors.password
                                    ? "border-danger"
                                    : "border-border focus:border-primary"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {touched.password && errors.password && (
                        <p className="text-danger text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                    Войти
                </button>
            </form>

            <p className="text-center text-text-muted mt-6">
                Нет аккаунта?{" "}
                <Link to="/register" className="text-primary hover:underline">
                    Зарегистрироваться
                </Link>
            </p>
        </div>
    )
}