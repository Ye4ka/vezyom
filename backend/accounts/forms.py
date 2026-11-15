from django import forms
from django.contrib.auth.models import User


class RegisterForm(forms.Form):
    full_name = forms.CharField(label='ФИО', max_length=150)
    username = forms.CharField(label='Логин', max_length=30)
    email = forms.EmailField(label='Email')
    password1 = forms.CharField(label='Пароль', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Повтор пароля', widget=forms.PasswordInput)

    def clean_full_name(self):
        name = ' '.join(self.cleaned_data['full_name'].split())
        if len(name) < 3:
            raise forms.ValidationError('Введите ФИО полностью.')
        return name

    def clean_username(self):
        username = self.cleaned_data['username'].strip()
        if len(username) < 3:
            raise forms.ValidationError('Логин должен содержать минимум 3 символа.')
        if User.objects.filter(username__iexact=username).exists():
            raise forms.ValidationError('Пользователь с таким логином уже существует.')
        return username

    def clean_email(self):
        email = self.cleaned_data['email'].strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError('Пользователь с таким email уже существует.')
        return email

    def clean_password1(self):
        password = self.cleaned_data['password1']
        if len(password) < 8:
            raise forms.ValidationError('Пароль должен содержать минимум 8 символов.')
        return password

    def clean(self):
        cleaned = super().clean()
        p1, p2 = cleaned.get('password1'), cleaned.get('password2')
        if p1 and p2 and p1 != p2:
            self.add_error('password2', 'Пароли не совпадают.')
        return cleaned

class LoginForm(forms.Form):
    identifier = forms.CharField(label='Логин или email')
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput)