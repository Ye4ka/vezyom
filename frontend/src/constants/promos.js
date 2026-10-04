import slide1 from "../assets/slides/slide-1.jpg"
import slide2 from "../assets/slides/slide-2.jpg"
import slide3 from "../assets/slides/slide-3.jpg"

export const promos = [
    {
        id: 1,
        title: "Скидка 20% на первый заказ",
        subtitle: "Промокод VEZYOM20 при регистрации",
        cta: "Начать заказ",
        to: "/register",
        img: slide1,
    },
    {
        id: 2,
        title: "Новые рестораны в каталоге",
        subtitle: "Уже больше 30 заведений города доставляют через нас",
        cta: "Смотреть каталог",
        to: "/catalog",
        img: slide2,
    },
    {
        id: 3,
        title: "Доставка от 20 минут",
        subtitle: "Выбирай рестораны рядом с домом",
        cta: "Смотреть рестораны",
        to: "/catalog",
        img: slide3,
    },
]