import Logo from "../../assets/icon/logo.svg";
import Telegram from "../../assets/icon/telegram.svg";
import Vk from "../../assets/icon/vk.svg";
import { Link, NavLink } from "react-router-dom";
import { Phone, Mail, Clock } from "lucide-react";
import { navigation } from '../../constants/navigation'

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 border-b border-border pb-8">
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-3">
                            <img src={Logo} alt="Везём" className="h-8 w-auto" />
                            <span className="text-text font-bold tracking-widest text-lg">
                                Везём
                            </span>
                        </Link>
                        <p className="text-text-muted text-sm">
                            Из любимых ресторанов - к твоей двери
                        </p>
                    </div>
                    <div>
                        <h3 className="text-text font-bold tracking-widest text-lg mb-3">
                            Навигация
                        </h3>
                        <nav className="flex flex-col gap-2">
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
                    </div>
                    <div>
                        <h3 className="text-text font-bold tracking-widest text-lg mb-3">
                            Контакты
                        </h3>
                        <div className="flex items-center gap-2 text-text-muted text-sm">
                            <Phone size={18} />
                            <span>+7 959 396-92-30</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-muted text-sm mt-2">
                            <Mail size={18} />
                            <span>vezyom@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-muted text-sm mt-2">
                            <Clock size={18} />
                            <span>8:00–22:00</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-text font-bold tracking-widest text-lg mb-3">
                            Мы в соцсетях
                        </h3>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-text-muted hover:bg-primary flex items-center justify-center transition-colors"
                                aria-label="Telegram"
                            >
                                <img src={Telegram} alt="Telegram" className="w-4.5 h-4.5" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-text-muted hover:bg-primary flex items-center justify-center transition-colors"
                                aria-label="VK"
                            >
                                <img src={Vk} alt="VK" className="w-4.5 h-4.5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-text-muted">© Везём 2026</p>
                    <Link to="/policy" className="text-text-muted hover:text-primary transition-colors">
                        Политика конфиденциальности
                    </Link>
                </div>
            </div>
        </footer>
    )
}