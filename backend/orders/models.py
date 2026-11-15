from django.conf import settings
from django.db import models

from menu.models import Restaurant, Dish


class Order(models.Model):
    class Status(models.TextChoices):
        NEW = 'NEW', 'Новый'
        IN_PROGRESS = 'IN_PROGRESS', 'В работе'
        DONE = 'DONE', 'Выполнен'
        CANCELED = 'CANCELED', 'Отменён'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.PROTECT, related_name='orders')
    address = models.CharField('Адрес доставки', max_length=200)
    comment = models.TextField('Комментарий', blank=True)
    status = models.CharField('Статус', max_length=15, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Заказ №{self.pk}'

    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    dish = models.ForeignKey(Dish, on_delete=models.PROTECT, related_name='order_items')
    quantity = models.PositiveSmallIntegerField('Количество')
    price = models.DecimalField('Цена на момент заказа', max_digits=8, decimal_places=2)

    @property
    def subtotal(self):
        return self.price * self.quantity