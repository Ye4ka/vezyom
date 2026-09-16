import Logo from "../../assets/icon/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import AuthDropdown from "./AuthDropdown";
import { navigation } from '../../constants/navigation'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <header className="bg-surface text-text sticky top-0 z-50 border-b border-border">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={Logo} alt="Везём" className="h-8 w-auto" />
                        <span className="text-text font-bold tracking-widest text-lg">
                            Везём
                        </span>
                    </Link>

                    <nav className="gap-8 text-lg font-semibold text-text hidden md:flex">
                        {navigation.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `transition-colors ${isActive ? "text-primary" : "hover:text-primary"}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <AuthDropdown />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-text hover:text-primary transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <nav className="md:hidden border-t border-border py-4 space-y-2">
                        {navigation.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block py-2 text-base font-semibold transition-colors ${isActive ? "text-primary" : "text-text hover:text-primary"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    )
}