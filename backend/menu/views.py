from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404

from .forms import DishForm
from .models import Dish, Category


def dish_list(request):
    dishes = Dish.objects.select_related('restaurant', 'category')

    q = request.GET.get('q', '').strip()
    category_id = request.GET.get('category', '')

    if q:
        dishes = dishes.filter(name__icontains=q)       # WHERE name ILIKE '%q%'
    if category_id.isdigit():
        dishes = dishes.filter(category_id=int(category_id))

    context = {
        'dishes': dishes,
        'categories': Category.objects.all(),
        'q': q,
        'selected_category': category_id,
    }
    return render(request, 'menu/dish_list.html', context)


def dish_create(request):
    if request.method == 'POST':
        form = DishForm(request.POST)
        if form.is_valid():
            form.save()                                  # INSERT
            messages.success(request, 'Блюдо добавлено.')
            return redirect('menu:dish_list')
    else:
        form = DishForm()
    return render(request, 'menu/dish_form.html', {'form': form})


def dish_detail(request, pk):
    dish = get_object_or_404(
        Dish.objects.select_related('restaurant', 'category'), pk=pk
    )                                                    # SELECT ... WHERE id = pk
    return render(request, 'menu/dish_detail.html', {'dish': dish})


def dish_update(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    if request.method == 'POST':
        form = DishForm(request.POST, instance=dish)
        if form.is_valid():
            form.save()                                  # UPDATE ... WHERE id = pk
            messages.success(request, 'Изменения сохранены.')
            return redirect('menu:dish_detail', pk=dish.pk)
    else:
        form = DishForm(instance=dish)
    return render(request, 'menu/dish_form.html', {'form': form, 'dish': dish})


def dish_delete(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    if request.method == 'POST':
        dish.delete()                                    # DELETE ... WHERE id = pk
        messages.success(request, 'Блюдо удалено.')
        return redirect('menu:dish_list')
    return render(request, 'menu/dish_confirm_delete.html', {'dish': dish})