from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect, get_object_or_404

from menu.models import Restaurant
from .models import Order, OrderItem


@login_required
def order_create(request):
    restaurant_id = request.GET.get('restaurant', '')
    if not restaurant_id.isdigit():
        # шаг 1: выбор ресторана
        return render(request, 'orders/choose_restaurant.html',
                    {'restaurants': Restaurant.objects.all()})

    restaurant = get_object_or_404(Restaurant, pk=int(restaurant_id))
    # только блюда выбранного ресторана: чужие id из формы игнорируются
    dishes = list(restaurant.dishes.select_related('category'))
    errors = []
    address = ''
    comment = ''

    if request.method == 'POST':
        address = request.POST.get('address', '').strip()
        comment = request.POST.get('comment', '').strip()
        chosen = {}

        for d in dishes:
            raw = request.POST.get(f'qty_{d.pk}', '').strip()
            d.qty = raw
            if raw == '':
                continue
            if not raw.isdigit() or int(raw) > 20:
                errors.append(f'«{d.name}»: количество должно быть числом от 0 до 20.')
            elif int(raw) > 0:
                chosen[d.pk] = int(raw)

        if len(address) < 5:
            errors.append('Укажите адрес доставки (минимум 5 символов).')
        if not chosen and not errors:
            errors.append('Выберите хотя бы одно блюдо.')

        if not errors:
            with transaction.atomic():
                order = Order.objects.create(
                    user=request.user, restaurant=restaurant,
                    address=address, comment=comment,
                )
                OrderItem.objects.bulk_create([
                    OrderItem(order=order, dish=d, quantity=chosen[d.pk], price=d.price)
                    for d in dishes if d.pk in chosen
                ])
            messages.success(request, f'Заказ №{order.pk} создан.')
            return redirect('orders:order_detail', pk=order.pk)

    return render(request, 'orders/order_form.html', {
        'restaurant': restaurant, 'dishes': dishes,
        'errors': errors, 'address': address, 'comment': comment,
    })


@login_required
def order_list(request):
    orders = (Order.objects.filter(user=request.user)        # только свои заказы
            .select_related('restaurant')
            .prefetch_related('items'))
    return render(request, 'orders/order_list.html', {'orders': orders})


@login_required
def order_detail(request, pk):
    # чужой заказ: запись не найдена, будет 404
    order = get_object_or_404(
        Order.objects.select_related('restaurant').prefetch_related('items__dish'),
        pk=pk, user=request.user,
    )
    return render(request, 'orders/order_detail.html', {'order': order})