from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.db import transaction
from django.shortcuts import render, redirect
from django.utils.http import url_has_allowed_host_and_scheme
from django.views.decorators.http import require_POST

from .forms import RegisterForm, LoginForm
from .models import Profile


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            with transaction.atomic():
                user = User.objects.create_user(      # пароль хешируется внутри
                    username=data['username'],
                    email=data['email'],
                    password=data['password1'],
                )
                Profile.objects.create(user=user, full_name=data['full_name'], role=Profile.Role.USER)
            messages.success(request, 'Регистрация прошла успешно. Теперь войдите.')
            return redirect('accounts:login')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect('menu:dish_list')

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            identifier = form.cleaned_data['identifier'].strip()
            password = form.cleaned_data['password']

            # ищем пользователя по логину или по email
            account = (User.objects.filter(username__iexact=identifier).first()
                    or User.objects.filter(email__iexact=identifier).first())

            user = None
            if account is not None:
                user = authenticate(request, username=account.username, password=password)

            if user is not None:
                auth_login(request, user)             # создаёт сессию
                nxt = request.POST.get('next') or request.GET.get('next')
                if nxt and url_has_allowed_host_and_scheme(nxt, allowed_hosts={request.get_host()}):
                    return redirect(nxt)
                return redirect('menu:dish_list')

            # одно сообщение для неверного логина и неверного пароля
            form.add_error(None, 'Неверный логин/email или пароль.')
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form, 'next': request.GET.get('next', '')})


@require_POST
def logout_view(request):
    auth_logout(request)                              # удаляет сессию
    messages.success(request, 'Вы вышли из аккаунта.')
    return redirect('menu:dish_list')