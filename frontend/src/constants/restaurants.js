import vkuso from "../assets/restaurants/vkuso-i-tochka.jpg";
import burgerKing from "../assets/restaurants/burger-king.jpg";
import kioto from "../assets/restaurants/kioto.jpg";
import granzh from "../assets/restaurants/granzh.jpg";
import yaposhka from "../assets/restaurants/yaposhka.jpg";
import sushibox from "../assets/restaurants/sushibox.jpeg";

const dishImages = import.meta.glob("../assets/dishes/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
});
console.log(dishImages);

const dishImg = (name) => dishImages[`../assets/dishes/${name}`];

export const restaurants = [
    {
        id: 1,
        name: "Вкусно и быстро",
        cuisine: "Бургеры и фастфуд",
        rating: 4.8,
        deliveryTime: "25-35 мин",
        img: vkuso,
        address: "ул. Гончарова, 32",
        workHours: "9:00–23:00",
        minOrder: 300,
        dishes: [
            { id: 101, name: "Гамбургер", description: "Говяжья котлета, сыр чеддер, маринованные огурцы, соус", price: 259, category: "Бургеры", weight: "230 г", img: dishImg("vkuso-1.jpg") },
            { id: 102, name: "Картофель фри", description: "Хрустящий картофель фри с солью", price: 149, category: "Снеки", weight: "150 г", img: dishImg("vkuso-2.jpg") },
            { id: 103, name: "Наггетсы", description: "6 куриных наггетсов с соусом на выбор", price: 219, category: "Снеки", weight: "120 г", img: dishImg("vkuso-3.jpg") },
            { id: 104, name: "Молочный коктейль", description: "Ванильный коктейль", price: 179, category: "Напитки", weight: "400 мл", img: dishImg("vkuso-4.jpg") },
            { id: 105, name: "Биг Хит", description: "Две говяжьи котлеты, сыр, фирменный соус, на двойной булочке", price: 329, category: "Бургеры", weight: "250 г", img: dishImg("vkuso-5.jpg") },
            { id: 106, name: "Пирожок яблочный", description: "Хрустящий пирожок с яблочной начинкой", price: 89, category: "Десерты", weight: "80 г", img: dishImg("vkuso-6.jpg") },
        ],
    },
    {
        id: 2,
        name: "Бургер Крут",
        cuisine: "Бургеры и фастфуд",
        rating: 4.6,
        deliveryTime: "30-40 мин",
        img: burgerKing,
        address: "пр-т Ленинского Комсомола, 15",
        workHours: "10:00–22:00",
        minOrder: 350,
        dishes: [
            { id: 201, name: "Воппер", description: "Двойная говяжья котлета на гриле, свежие овощи", price: 329, category: "Бургеры", weight: "270 г", img: dishImg("burgerKing-1.jpg") },
            { id: 202, name: "Чикен ролл", description: "Куриное филе в хрустящей панировке, салат, соус", price: 269, category: "Бургеры", weight: "220 г", img: dishImg("burgerKing-2.jpg") },
            { id: 203, name: "Луковые кольца", description: "Хрустящие луковые кольца", price: 169, category: "Снеки", weight: "150 г", img: dishImg("burgerKing-3.jpg") },
            { id: 204, name: "Кока-Кола", description: "Газированный напиток", price: 139, category: "Напитки", weight: "330 мл", img: dishImg("burgerKing-4.jpg") },
            { id: 205, name: "Чизбургер", description: "Говяжья котлета, сыр чеддер, маринованные огурцы, кетчуп, горчица", price: 219, category: "Бургеры", weight: "200 г", img: dishImg("burgerKing-5.jpg") },
            { id: 206, name: "Мороженое рожок", description: "Ванильное мороженое в вафельном рожке", price: 79, category: "Десерты", weight: "70 г", img: dishImg("burgerKing-6.jpg") },
        ],
    },
    {
        id: 3,
        name: "Киото",
        cuisine: "Японская кухня",
        rating: 4.7,
        deliveryTime: "20-30 мин",
        img: kioto,
        address: "ул. Карла Маркса, 10",
        workHours: "11:00–23:00",
        minOrder: 500,
        dishes: [
            { id: 301, name: "Филадельфия", description: "Ролл с лососем, сливочным сыром и огурцом, 8 шт", price: 389, category: "Роллы", weight: "320 г", img: dishImg("kioto-1.jpg") },
            { id: 302, name: "Калифорния", description: "Ролл с крабом, авокадо и икрой тобико, 8 шт", price: 349, category: "Роллы", weight: "300 г", img: dishImg("kioto-2.jpg") },
            { id: 303, name: "Мисо-суп", description: "Традиционный суп с тофу и водорослями вакаме", price: 189, category: "Супы", weight: "250 мл", img: dishImg("kioto-3.jpg") },
            { id: 304, name: "Сет Киото", description: "32 кусочка ассорти из 4 видов роллов", price: 899, category: "Сеты", weight: "900 г", img: dishImg("kioto-4.jpg") },
            { id: 305, name: "Зелёный чай", description: "Горячий зелёный чай", price: 99, category: "Напитки", weight: "400 мл", img: dishImg("kioto-5.jpg") },
            { id: 306, name: "Спайси лосось", description: "Ролл с лососем, острым соусом и зелёным луком, 8 шт", price: 369, category: "Роллы", weight: "300 г", img: dishImg("kioto-6.jpg") },
        ],
    },
    {
        id: 4,
        name: "Гранж",
        cuisine: "Европейская кухня",
        rating: 4.9,
        deliveryTime: "35-45 мин",
        img: granzh,
        address: "ул. Минаева, 6",
        workHours: "12:00–00:00",
        minOrder: 600,
        dishes: [
            { id: 401, name: "Паста Карбонара", description: "Спагетти, бекон, пармезан, сливочный соус", price: 429, category: "Паста", weight: "320 г", img: dishImg("granzh-1.jpg") },
            { id: 402, name: "Стейк Рибай", description: "Говяжий стейк на гриле с овощами", price: 890, category: "Горячее", weight: "250 г", img: dishImg("granzh-2.jpg") },
            { id: 403, name: "Цезарь с курицей", description: "Салат с куриным филе, пармезаном и соусом цезарь", price: 349, category: "Салаты", weight: "280 г", img: dishImg("granzh-3.jpg") },
            { id: 404, name: "Тирамису", description: "Классический итальянский десерт", price: 259, category: "Десерты", weight: "150 г", img: dishImg("granzh-4.jpg") },
            { id: 405, name: "Домашний лимонад", description: "С мятой и лаймом", price: 189, category: "Напитки", weight: "300 мл", img: dishImg("granzh-5.jpg") },
            { id: 406, name: "Брускетта с томатами", description: "Поджаренный багет с томатами, базиликом и оливковым маслом", price: 229, category: "Закуски", weight: "180 г", img: dishImg("granzh-6.jpg") },
        ],
    },
    {
        id: 5,
        name: "Япошка",
        cuisine: "Суши и роллы",
        rating: 4.5,
        deliveryTime: "15-25 мин",
        img: yaposhka,
        address: "ул. Радищева, 28",
        workHours: "10:00–22:30",
        minOrder: 400,
        dishes: [
            { id: 501, name: "Ролл Дракон", description: "Ролл с угрём, авокадо и соусом унаги, 8 шт", price: 419, category: "Роллы", weight: "300 г", img: dishImg("yaposhka-1.jpg") },
            { id: 502, name: "Ролл Сяке", description: "Ролл с лососем и сливочным сыром, 8 шт", price: 359, category: "Роллы", weight: "280 г", img: dishImg("yaposhka-2.jpg") },
            { id: 503, name: "Гёдза", description: "Жареные пельмени с курицей, 5 шт", price: 229, category: "Горячее", weight: "200 г", img: dishImg("yaposhka-3.jpg") },
            { id: 504, name: "Чай с жасмином", description: "Горячий чай", price: 99, category: "Напитки", weight: "400 мл", img: dishImg("yaposhka-4.jpg") },
            { id: 505, name: "Ролл Канада", description: "Ролл с крабом, огурцом и икрой тобико, 8 шт", price: 379, category: "Роллы", weight: "290 г", img: dishImg("yaposhka-5.jpg") },
            { id: 506, name: "Якитори", description: "Куриные шашлычки на шпажках в соусе терияки", price: 259, category: "Горячее", weight: "180 г", img: dishImg("yaposhka-6.jpg") },
        ],
    },
    {
        id: 6,
        name: "Сушибокс",
        cuisine: "Суши и роллы",
        rating: 4.8,
        deliveryTime: "30-40 мин",
        img: sushibox,
        address: "ул. Пушкинская, 1",
        workHours: "11:00–23:00",
        minOrder: 450,
        dishes: [
            { id: 601, name: "Биг сет", description: "40 кусочков ассорти роллов на компанию", price: 1190, category: "Сеты", weight: "1200 г", img: dishImg("sushibox-1.jpg") },
            { id: 602, name: "Ролл Темпура", description: "Ролл с креветкой темпура и соусом унаги, 8 шт", price: 399, category: "Роллы", weight: "320 г", img: dishImg("sushibox-2.jpg") },
            { id: 603, name: "Сашими лосось", description: "Нарезка свежего лосося, 6 кусочков", price: 449, category: "Сашими", weight: "180 г", img: dishImg("sushibox-3.jpg") },
            { id: 604, name: "Эдамаме", description: "Стручки соевых бобов с морской солью", price: 199, category: "Закуски", weight: "150 г", img: dishImg("sushibox-4.jpg") },
            { id: 605, name: "Кока-Кола", description: "Газированный напиток", price: 149, category: "Напитки", weight: "330 мл", img: dishImg("sushibox-5.jpg") },
            { id: 606, name: "Мисо-суп", description: "Традиционный суп с тофу и водорослями вакаме", price: 179, category: "Супы", weight: "250 мл", img: dishImg("sushibox-6.jpg") },
        ],
    },
];