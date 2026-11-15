from django.contrib import messages
from django.contrib.auth.models import User
from django.db import transaction
from django.shortcuts import render, redirect

from .forms import RegisterForm
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