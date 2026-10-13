# Везём: backend (ЛР №2)

Django + PostgreSQL. Каталог блюд: список, просмотр, добавление, изменение, удаление, поиск и фильтр по категории.

## База данных
Таблицы: `menu_restaurant`, `menu_category`, `menu_dish`. Связи: ресторан 1:N блюда, категория 1:N блюда.
ER-диаграмма: `../docs/er-diagram.png`. Структура: `sql/schema.sql`. Примеры запросов: `sql/queries.sql`.

## Запуск
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```
1. Создать БД `vezyom` в PostgreSQL.
2. Скопировать `.env.example` в `.env` и указать пароль.
3. `python manage.py migrate`
4. `python manage.py createsuperuser` (для заполнения тестовыми данными в `/admin/`)
5. `python manage.py runserver` и открыть http://127.0.0.1:8000/

## Маршруты
| URL | Метод | Что делает |
|---|---|---|
| `/` | GET | Каталог (поиск `?q=`, фильтр `?category=`) |
| `/dishes/new/` | GET, POST | Форма добавления |
| `/dishes/<id>/` | GET | Страница блюда |
| `/dishes/<id>/edit/` | GET, POST | Изменение |
| `/dishes/<id>/delete/` | GET, POST | Подтверждение и удаление |