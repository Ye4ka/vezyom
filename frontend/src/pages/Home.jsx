import { Link } from "react-router-dom";
import { Search, ShoppingBag, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import RestaurantCard from "../components/ui/RestaurantCard"
import { restaurants } from "../constants/restaurants"
import PromoSlider from "../components/ui/PromoSlider"

const steps = [
    { icon: Search, title: "Выбери ресторан", text: "Каталог заведений рядом с тобой" },
    { icon: ShoppingBag, title: "Собери заказ", text: "Добавь блюда из меню в корзину" },
    { icon: Truck, title: "Получи доставку", text: "Курьер привезёт заказ к твоей двери" },
]

export default function Home() {
    const scrollRef = useRef(null)
    const scroll = (direction) => {
        scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 mt-6 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
                <div>
                    <h1 className="text-4xl md:text-4xl font-bold">Везём</h1>
                    <h3 className="text-lg md:text-xl text-text-muted">Выбирай ресторан. Заказывай блюда. Получай доставку</h3>
                </div>
                <Link to="/catalog" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
                    Смотреть рестораны
                </Link>
            </div>

            <div className="mt-10">
                <PromoSlider />
            </div>

            <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Популярные рестораны</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            aria-label="Прокрутить влево"
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            aria-label="Прокрутить вправо"
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
                <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2 pt-2">
                    {restaurants.map(r => (
                        <div key={r.id} className="w-64 shrink-0">
                            <RestaurantCard restaurant={r} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {steps.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="text-center">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Icon className="text-primary" size={24} />
                        </div>
                        <h3 className="font-bold mb-2">{title}</h3>
                        <p className="text-text-muted text-sm">{text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}