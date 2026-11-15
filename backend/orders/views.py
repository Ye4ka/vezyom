from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST

from menu.models import Restaurant
from .forms import OrderEditForm
from .models import Order, OrderItem
from accounts.decorators import admin_required

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


@login_required
def order_update(request, pk):
    order = get_object_or_404(Order, pk=pk, user=request.user)
    if order.status != Order.Status.NEW:
        messages.error(request, 'Изменять можно только новые заказы.')
        return redirect('orders:order_detail', pk=order.pk)

    if request.method == 'POST':
        form = OrderEditForm(request.POST, instance=order)
        if form.is_valid():
            form.save()                                      # UPDATE
            messages.success(request, 'Заказ обновлён.')
            return redirect('orders:order_detail', pk=order.pk)
    else:
        form = OrderEditForm(instance=order)
    return render(request, 'orders/order_edit.html', {'form': form, 'order': order})


@login_required
@require_POST
def order_cancel(request, pk):
    order = get_object_or_404(Order, pk=pk, user=request.user)
    if order.status != Order.Status.NEW:
        messages.error(request, 'Отменить можно только новый заказ.')
    else:
        order.status = Order.Status.CANCELED
        order.save(update_fields=['status'])                 # UPDATE status
        messages.success(request, f'Заказ №{order.pk} отменён.')
    return redirect('orders:order_detail', pk=order.pk)

# допустимые переходы статуса
STATUS_FLOW = {
    Order.Status.NEW: [Order.Status.IN_PROGRESS, Order.Status.CANCELED],
    Order.Status.IN_PROGRESS: [Order.Status.DONE, Order.Status.CANCELED],
    Order.Status.DONE: [],
    Order.Status.CANCELED: [],
}


@admin_required
def manage_order_list(request):
    orders = (Order.objects.select_related('user__profile', 'restaurant')   # заказы ВСЕХ пользователей
            .prefetch_related('items'))

    status = request.GET.get('status', '')
    if status in Order.Status.values:
        orders = orders.filter(status=status)

    for o in orders:
        o.next_statuses = [(s.value, s.label) for s in STATUS_FLOW[o.status]]

    return render(request, 'orders/manage_list.html', {
        'orders': orders,
        'statuses': Order.Status.choices,
        'selected_status': status,
    })


@admin_required
@require_POST
def manage_order_status(request, pk):
    order = get_object_or_404(Order, pk=pk)
    new_status = request.POST.get('status', '')
    allowed = [s.value for s in STATUS_FLOW[order.status]]

    if new_status not in allowed:
        messages.error(request, 'Недопустимая смена статуса.')
    else:
        order.status = new_status
        order.save(update_fields=['status'])                 # UPDATE status
        messages.success(request, f'Заказ №{order.pk}: статус изменён на «{order.get_status_display()}».')
    return redirect('orders:manage_list')