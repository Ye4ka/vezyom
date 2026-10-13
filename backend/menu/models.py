from django.db import models


class Restaurant(models.Model):
    name = models.CharField('Название', max_length=100)
    address = models.CharField('Адрес', max_length=200, blank=True)
    rating = models.DecimalField('Рейтинг', max_digits=2, decimal_places=1, default=0)
    delivery_time = models.PositiveSmallIntegerField('Время доставки, мин', default=30)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField('Название', max_length=50, unique=True)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Dish(models.Model):
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name='dishes', verbose_name='Ресторан'
    )
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name='dishes', verbose_name='Категория'
    )
    name = models.CharField('Название', max_length=100)
    description = models.TextField('Описание', blank=True)
    price = models.DecimalField('Цена, ₽', max_digits=8, decimal_places=2)
    weight = models.PositiveIntegerField('Вес, г', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name