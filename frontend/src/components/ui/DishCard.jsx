import { Plus, Minus } from "lucide-react"

export default function DishCard({ dish, qty, onAdd, onRemove }) {
    return (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="aspect-video bg-primary/10 flex items-center justify-center overflow-hidden">
                {dish.img ? (
                    <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-primary text-3xl font-bold">{dish.name[0]}</span>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold mb-1">{dish.name}</h3>
                <p className="text-text-muted text-sm line-clamp-2 mb-1">{dish.description}</p>
                <p className="text-text-muted text-xs mb-3">{dish.weight}</p>
                <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">{dish.price} ₽</p>
                    {qty === 0 ? (
                        <button
                            onClick={onAdd}
                            className="h-9 px-4 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
                        >
                            Добавить
                        </button>
                    ) : (
                        <div className="h-9 flex items-center gap-3">
                            <button
                                onClick={onRemove}
                                aria-label="Убрать одну порцию"
                                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="font-semibold w-4 text-center">{qty}</span>
                            <button
                                onClick={onAdd}
                                aria-label="Добавить ещё одну порцию"
                                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}