import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, CheckCircle } from "lucide-react"

const initialValues = {
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
}

function validateField(name, value, allValues) {
    switch (name) {
        case "fullName":
            return value.trim() ? "" : "Введите ФИО"
        case "email": {
            if (!value.trim()) return "Введите email"
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(value) ? "" : "Некорректный формат email"
        }
        case "username":
            if (!value.trim()) return "Введите логин"
            return value.trim().length >= 3 ? "" : "Логин должен быть не короче 3 символов"
        case "password":
            if (!value) return "Введите пароль"
            return value.length >= 8 ? "" : "Пароль должен быть не короче 8 символов"
        case "confirmPassword":
            if (!value) return "Повторите пароль"
            return value === allValues.password ? "" : "Пароли не совпадают"
        default:
            return ""
    }
}

export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(prev => ({ ...prev, [name]: value }))
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
        setErrors(prev => ({ ...prev, [name]: validateField(name, value, values) }))

        if (name === "password" && touched.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateField("confirmPassword", values.confirmPassword, { ...values, password: value }),
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const allErrors = {}
        Object.keys(initialValues).forEach(name => {
            allErrors[name] = validateField(name, values[name], values)
        })
        setErrors(allErrors)
        setTouched({ fullName: true, email: true, username: true, password: true, confirmPassword: true })

        const hasErrors = Object.values(allErrors).some(Boolean)
        if (hasErrors) return

        setSubmitted(true)
        setTimeout(() => navigate("/login"), 1500)
    }

    if (submitted) {
        return (
            <div className="max-w-md mx-auto px-4 mt-20 pb-20 text-center">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Регистрация успешна!</h1>
                <p className="text-text-muted">Сейчас перенаправим тебя на страницу входа...</p>
            </div>
        )
    }

    const fields = [
        { name: "fullName", label: "ФИО", type: "text", placeholder: "Иванов Иван Иванович" },
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
        { name: "username", label: "Логин", type: "text", placeholder: "ivan_ivanov" },
    ]

    return (
        <div className="max-w-md mx-auto px-4 mt-10 pb-20">
            <h1 className="text-3xl font-bold mb-2">Регистрация</h1>
            <p className="text-text-muted mb-8">Создай аккаунт, чтобы заказывать в «Везём»</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {fields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-semibold mb-1">
                            {field.label}
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={values[field.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 rounded-xl border bg-surface text-text focus:outline-none transition-colors ${
                                touched[field.name] && errors[field.name]
                                    ? "border-danger"
                                    : "border-border focus:border-primary"
                            }`}
                        />
                        {touched[field.name] && errors[field.name] && (
                            <p className="text-danger text-sm mt-1">{errors[field.name]}</p>
                        )}
                    </div>
                ))}

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold mb-1">
                        Пароль
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Минимум 8 символов"
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

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">
                        Повтор пароля
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Повтори пароль"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 pr-12 rounded-xl border bg-surface text-text focus:outline-none transition-colors ${
                                touched.confirmPassword && errors.confirmPassword
                                    ? "border-danger"
                                    : "border-border focus:border-primary"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(v => !v)}
                            aria-label={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                        <p className="text-danger text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                    Зарегистрироваться
                </button>
            </form>

            <p className="text-center text-text-muted mt-6">
                Уже есть аккаунт?{" "}
                <Link to="/login" className="text-primary hover:underline">
                    Войти
                </Link>
            </p>
        </div>
    )
}