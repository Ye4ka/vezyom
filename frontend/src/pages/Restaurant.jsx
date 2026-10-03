import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, Search } from "lucide-react"
import { restaurants } from "../constants/restaurants"
import DishCard from "../components/ui/DishCard"
import Star from "../assets/icon/star.svg"

function pluralizeItems(n) {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod100 >= 11 && mod100 <= 14) return "товаров"
    if (mod10 === 1) return "товар"
    if (mod10 >= 2 && mod10 <= 4) return "товара"
    return "товаров"
}

export default function Restaurant() {
    const { restaurantId } = useParams()
    const restaurant = restaurants.find(r => r.id === Number(restaurantId))

    const [cart, setCart] = useState({})
    const [query, setQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("Все")

    if (!restaurant) {
        return (
            <div className="max-w-7xl mx-auto px-4 mt-6 pb-20 text-center">
                <p className="text-text-muted mb-4">Ресторан не найден</p>
                <Link to="/catalog" className="text-primary hover:underline">
                    Вернуться в каталог
                </Link>
            </div>
        )
    }

    const addToCart = (id) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    }

    const removeFromCart = (id) => {
        setCart(prev => {
            const next = { ...prev }
            if (next[id] <= 1) {
                delete next[id]
            } else {
                next[id] -= 1
            }
            return next
        })
    }

    const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0)
    const totalPrice = restaurant.dishes.reduce((sum, d) => sum + (cart[d.id] || 0) * d.price, 0)

    const categories = ["Все", ...new Set(restaurant.dishes.map(d => d.category))]

    const filteredDishes = restaurant.dishes.filter(d => {
        const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase())
        const matchesCategory = activeCategory === "Все" || d.category === activeCategory
        return matchesQuery && matchesCategory
    })

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 mt-6 pb-24">
                <Link to="/catalog" className="inline-flex items-center gap-1 text-text-muted hover:text-primary transition-colors mb-6">
                    <ChevronLeft size={18} />
                    Назад в каталог
                </Link>

                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center">
                        {restaurant.img ? (
                            <img src={restaurant.img} alt={restaurant.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-primary text-2xl font-bold">{restaurant.name[0]}</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                        <div className="flex items-center gap-3 mt-1 text-text-muted flex-wrap">
                            <span>{restaurant.cuisine}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <img src={Star} alt="" className="w-4 h-4" />
                                {restaurant.rating}
                            </span>
                            <span>•</span>
                            <span>{restaurant.deliveryTime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-3 text-text-muted text-sm flex-wrap">
                    <span>{restaurant.address}</span>
                    <span>•</span>
                    <span>{restaurant.workHours}</span>
                    <span>•</span>
                    <span>Мин. заказ {restaurant.minOrder} ₽</span>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-6">Меню</h2>

                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" size={20} />
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Найти блюдо"
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-surface text-text focus:outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                activeCategory === cat
                                    ? "bg-primary text-white"
                                    : "bg-surface border border-border text-text hover:border-primary"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredDishes.length === 0 ? (
                    <p className="text-text-muted text-center mt-12">Ничего не найдено</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {filteredDishes.map(d => (
                            <DishCard
                                key={d.id}
                                dish={d}
                                qty={cart[d.id] || 0}
                                onAdd={() => addToCart(d.id)}
                                onRemove={() => removeFromCart(d.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {totalItems > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 flex items-center justify-between z-50">
                    <span className="font-semibold">
                        {totalItems} {pluralizeItems(totalItems)} · {totalPrice} ₽
                    </span>
                    <button
                        onClick={() => alert("Оформление заказа будет добавлено позже")}
                        className="bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
                    >
                        Оформить заказ
                    </button>
                </div>
            )}
        </>
    )
}