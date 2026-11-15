# Везём: backend (ЛР №2–3)

Django + PostgreSQL. Сервис доставки еды: каталог блюд, регистрация и вход, заказы пользователей, роли USER и ADMIN.

## Возможности
- **ЛР №2:** каталог блюд из БД: список, просмотр, добавление, изменение, удаление, поиск и фильтр по категории, серверная валидация.
- **ЛР №3:** регистрация и вход (сессии), выход, заказы пользователя (создание, просмотр, изменение, отмена), личный раздел «Мои заказы», роли USER и ADMIN, админ-раздел со сменой статусов заказов.

## База данных
Таблицы:
- `menu_restaurant`, `menu_category`, `menu_dish`: каталог;
- `auth_user`: пользователи (пароль хранится как хеш);
- `accounts_profile`: ФИО и роль (`USER` или `ADMIN`);
- `orders_order`, `orders_orderitem`: заказы и их позиции.

Связи:
- ресторан 1:N блюда, категория 1:N блюда;
- пользователь 1:1 профиль;
- пользователь 1:N заказы, ресторан 1:N заказы;
- заказ 1:N позиции, блюдо 1:N позиции.

ER-диаграмма: `../docs/er-diagram.png`. Структура БД: `sql/schema.sql`. Примеры запросов: `sql/queries.sql`.

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
4. `python manage.py loaddata demo_data` (рестораны, категории и блюда)
5. `python manage.py create_demo_users` (демо-аккаунты USER и ADMIN)
6. `python manage.py runserver` и открыть http://127.0.0.1:8000/

## Демо-аккаунты
| Роль | Логин | Пароль |
|---|---|---|
| ADMIN | `admin` | `Admin12345` |
| USER | `user` | `User12345` |

Только для демонстрации. Новые пользователи регистрируются через `/accounts/register/` и всегда получают роль USER.

## Роли и доступ
Права проверяются на сервере (декораторы `login_required` и `admin_required`), а не только скрытием кнопок.

| Действие | Гость | USER | ADMIN |
|---|---|---|---|
| Просмотр каталога | да | да | да |
| Управление блюдами | нет (вход) | 403 | да |
| Свои заказы | нет (вход) | да | да |
| Чужой заказ по id | нет (вход) | 404 | 404 |
| Все заказы, смена статусов | нет (вход) | 403 | да |

Статусы заказа: `NEW → IN_PROGRESS → DONE`, отмена (`CANCELED`) из `NEW` и `IN_PROGRESS`.

## Маршруты
| URL | Метод | Доступ | Что делает |
|---|---|---|---|
| `/` | GET | все | Каталог (поиск `?q=`, фильтр `?category=`) |
| `/dishes/<id>/` | GET | все | Страница блюда |
| `/dishes/new/` | GET, POST | ADMIN | Добавление блюда |
| `/dishes/<id>/edit/` | GET, POST | ADMIN | Изменение блюда |
| `/dishes/<id>/delete/` | GET, POST | ADMIN | Подтверждение и удаление |
| `/accounts/register/` | GET, POST | все | Регистрация |
| `/accounts/login/` | GET, POST | все | Вход (по логину или email) |
| `/accounts/logout/` | POST | вошедший | Выход |
| `/orders/` | GET | вошедший | Мои заказы |
| `/orders/new/` | GET, POST | вошедший | Создание заказа |
| `/orders/<id>/` | GET | владелец | Просмотр заказа |
| `/orders/<id>/edit/` | GET, POST | владелец | Изменение адреса и комментария (статус NEW) |
| `/orders/<id>/cancel/` | POST | владелец | Отмена заказа (статус NEW) |
| `/orders/manage/` | GET | ADMIN | Все заказы, фильтр по статусу |
| `/orders/manage/<id>/status/` | POST | ADMIN | Смена статуса заказа |