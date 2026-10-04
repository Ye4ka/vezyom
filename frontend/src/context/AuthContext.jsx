import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("vezyom_user")
        return stored ? JSON.parse(stored) : null
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem("vezyom_user", JSON.stringify(user))
        } else {
            localStorage.removeItem("vezyom_user")
        }
    }, [user])

    const login = (userData) => setUser(userData)
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth должен использоваться внутри AuthProvider")
    return context
}