from django.conf import settings
from django.db import models


class Profile(models.Model):
    class Role(models.TextChoices):
        USER = 'USER', 'Пользователь'
        ADMIN = 'ADMIN', 'Администратор'

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile'
    )
    full_name = models.CharField('ФИО', max_length=150)
    role = models.CharField('Роль', max_length=10, choices=Role.choices, default=Role.USER)

    def __str__(self):
        return f'{self.user.username} ({self.role})'

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN