from django import forms

from .models import Order


class OrderEditForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['address', 'comment']

    def clean_address(self):
        address = self.cleaned_data['address'].strip()
        if len(address) < 5:
            raise forms.ValidationError('Укажите адрес доставки (минимум 5 символов).')
        return address