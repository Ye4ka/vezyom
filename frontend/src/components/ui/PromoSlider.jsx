import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Arrowl from "../../assets/icon/Arrow-l.svg"
import Arrowr from "../../assets/icon/Arrow-r.svg"
import { promos } from "../../constants/promos"

export default function PromoSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const touchStartX = useRef(null)
    const touchEndX = useRef(null)
    const SWIPE_THRESHOLD = 50

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length)
    }

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % promos.length)
    }

    useEffect(() => {
        const interval = setInterval(goToNext, 5000)
        return () => clearInterval(interval)
    }, [])

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    }
    const onTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX
    }
    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return
        const distance = touchStartX.current - touchEndX.current
        if (distance > SWIPE_THRESHOLD) goToNext()
        else if (distance < -SWIPE_THRESHOLD) goToPrev()
        touchStartX.current = null
        touchEndX.current = null
    }

    return (
        <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="relative h-72 sm:h-96 md:h-112 rounded-3xl overflow-hidden"
        >
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {promos.map((promo) => (
                    <div key={promo.id} className="relative w-full h-full shrink-0">
                        <img
                            src={promo.img}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:pl-20 sm:pr-12 text-white">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{promo.title}</h2>
                            <p className="text-white/90 mb-4 max-w-md">{promo.subtitle}</p>
                            <Link
                                to={promo.to}
                                className="self-start bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-colors"
                            >
                                {promo.cta}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={goToPrev}
                aria-label="Предыдущий слайд"
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 transition-colors items-center justify-center rounded-full z-20"
            >
                <img src={Arrowl} alt="" className="h-5 w-auto" />
            </button>
            <button
                onClick={goToNext}
                aria-label="Следующий слайд"
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 transition-colors items-center justify-center rounded-full z-20"
            >
                <img src={Arrowr} alt="" className="h-5 w-auto" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {promos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Перейти к слайду ${index + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            index === currentSlide ? "bg-white" : "bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}