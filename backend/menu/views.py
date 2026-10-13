from django.shortcuts import render, redirect

from .forms import DishForm
from .models import Dish


def dish_list(request):
    dishes = Dish.objects.select_related('restaurant', 'category')
    return render(request, 'menu/dish_list.html', {'dishes': dishes})


def dish_create(request):
    if request.method == 'POST':
        form = DishForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('menu:dish_list')
    else:
        form = DishForm()
    return render(request, 'menu/dish_form.html', {'form': form})