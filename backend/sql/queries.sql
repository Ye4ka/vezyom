-- Запросы, которые приложение выполняет через Django ORM (menu/views.py)

-- INSERT: dish_create, form.save()
INSERT INTO menu_dish (restaurant_id, category_id, name, description, price, weight, created_at)
VALUES (1, 1, 'Чизбургер', 'Говядина, сыр, соус', 249.00, 220, now());

-- SELECT: dish_list, список блюд с JOIN ресторана и категории
SELECT d.id, d.name, d.price, r.name AS restaurant, c.name AS category
FROM menu_dish d
JOIN menu_restaurant r ON r.id = d.restaurant_id
JOIN menu_category   c ON c.id = d.category_id
ORDER BY d.created_at DESC;

-- SELECT с условием: dish_detail, одна запись по id
SELECT * FROM menu_dish WHERE id = 1;

-- SELECT с фильтрацией: поиск и фильтр по категории в dish_list
SELECT * FROM menu_dish
WHERE name ILIKE '%бургер%' AND category_id = 1;

-- UPDATE: dish_update, form.save() для существующей записи
UPDATE menu_dish
SET name = 'Чизбургер Двойной', price = 329.00
WHERE id = 1;

-- DELETE: dish_delete, dish.delete()
DELETE FROM menu_dish WHERE id = 1;