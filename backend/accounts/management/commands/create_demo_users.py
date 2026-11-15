from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from accounts.models import Profile

DEMO_USERS = [
    ('admin', 'admin@vezyom.local', 'Admin12345', 'Администратор Везём', Profile.Role.ADMIN),
    ('user', 'user@vezyom.local', 'User12345', 'Иван Петров', Profile.Role.USER),
]


class Command(BaseCommand):
    help = 'Создаёт демо-пользователей: администратора и обычного пользователя'

    def handle(self, *args, **options):
        for username, email, password, full_name, role in DEMO_USERS:
            user, _ = User.objects.get_or_create(username=username)
            user.email = email
            user.set_password(password)          # хеш, а не открытый пароль
            user.save()
            Profile.objects.update_or_create(
                user=user, defaults={'full_name': full_name, 'role': role}
            )
            self.stdout.write(self.style.SUCCESS(f'{username} ({role}) готов'))