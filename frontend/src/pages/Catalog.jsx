import { useState } from "react"
import { Search } from "lucide-react"
import { restaurants } from "../constants/restaurants"
import RestaurantCard from "../components/ui/RestaurantCard"

const cuisines = ["Все", ...new Set(restaurants.map(r => r.cuisine))]

export default function Catalog() {
    const [query, setQuery] = useState("")
    const [activeCuisine, setActiveCuisine] = useState("Все")
    const [sortBy, setSortBy] = useState("default")

    const resetFilters = () => {
        setQuery("")
        setActiveCuisine("Все")
        setSortBy("default")
    }

    const filtered = restaurants.filter(r => {
        const matchesQuery =
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(query.toLowerCase())
        const matchesCuisine = activeCuisine === "Все" || r.cuisine === activeCuisine
        return matchesQuery && matchesCuisine
    })

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating
        if (sortBy === "delivery") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
        return 0
    })

    return (
        <div className="max-w-7xl mx-auto px-4 mt-6 pb-20">
            <h1 className="text-3xl font-bold mb-2">Рестораны</h1>

            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" size={20} />
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Найти ресторан или кухню"
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-surface text-text focus:outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar mt-6 pb-1">
                {cuisines.map(cuisine => (
                    <button
                        key={cuisine}
                        onClick={() => setActiveCuisine(cuisine)}
                        className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                            activeCuisine === cuisine
                                ? "bg-primary text-white"
                                : "bg-surface border border-border text-text hover:border-primary"
                        }`}
                    >
                        {cuisine}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
                <p className="text-text-muted text-sm">
                    Найдено {sorted.length} из {restaurants.length} ресторанов
                </p>

                <div className="flex items-center gap-3">
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-full border border-border bg-surface text-text text-sm focus:outline-none focus:border-primary"
                    >
                        <option value="default">По умолчанию</option>
                        <option value="rating">По рейтингу</option>
                        <option value="delivery">Быстрее всего</option>
                    </select>

                    <button
                        onClick={resetFilters}
                        className="text-sm text-text-muted hover:text-primary transition-colors"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            </div>

            {sorted.length === 0 ? (
                <p className="text-text-muted text-center mt-12">Ничего не найдено</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {sorted.map(r => (
                        <RestaurantCard key={r.id} restaurant={r} />
                    ))}
                </div>
            )}
        </div>
    )
}