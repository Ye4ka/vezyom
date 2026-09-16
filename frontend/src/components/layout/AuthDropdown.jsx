import Dropdown from "../ui/Dropdown";
import { Link } from "react-router-dom";
import { User } from "lucide-react"; 

const AuthDropdown = () => {
    return (
        <Dropdown
            align="right"
            trigger={({ open }) => (
                <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        open 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary'
                    }`}
                >
                    <User className={`w-5 h-5 transition-colors ${
                        open ? 'text-primary' : 'text-text-muted'
                    }`} />
                </button>
            )}
        >
            {({ close }) => (
                <div className="w-56 rounded-md bg-surface border border-border shadow-lg">
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
                </div>
            )}
        </Dropdown>
    );
};

export default AuthDropdown;