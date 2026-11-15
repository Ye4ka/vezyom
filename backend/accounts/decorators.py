from functools import wraps

from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied


def admin_required(view_func):
    """Гость → на страницу входа, не ADMIN → 403."""
    @login_required
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        profile = getattr(request.user, 'profile', None)   # у пользователя без профиля роли нет
        if profile is None or not profile.is_admin:
            raise PermissionDenied
        return view_func(request, *args, **kwargs)
    return wrapper