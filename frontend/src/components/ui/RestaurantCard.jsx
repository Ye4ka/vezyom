import { Link } from "react-router-dom";
import Star from "../../assets/icon/star.svg";

export default function RestaurantCard({ restaurant }) {
    return (
        <Link
            to={`/catalog/${restaurant.id}`}
            className="block bg-surface border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:border-primary transition-all"
        >
            <div className="aspect-video overflow-hidden">
                <img src={restaurant.img} alt={restaurant.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="font-bold truncate">{restaurant.name}</h3>
                <p className="text-text-muted text-sm">{restaurant.cuisine}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                        <img src={Star} alt="" className="w-4 h-4" />
                        {restaurant.rating}
                    </span>
                    <span>•</span>
                    <span>{restaurant.deliveryTime}</span>
                </div>
            </div>
        </Link>
    )
}