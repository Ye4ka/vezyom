from django.shortcuts import render, redirect, get_object_or_404

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

def dish_detail(request, pk):
    dish = get_object_or_404(Dish.objects.select_related('restaurant', 'category'), pk=pk)
    return render(request, 'menu/dish_detail.html', {'dish': dish})

def dish_update(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    if request.method == 'POST':
        form = DishForm(request.POST, instance=dish)
        if form.is_valid():
            form.save()                      
            return redirect('menu:dish_detail', pk=dish.pk)
    else:
        form = DishForm(instance=dish)       
    return render(request, 'menu/dish_form.html', {'form': form, 'dish': dish})

def dish_delete(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    if request.method == 'POST':
        dish.delete()                       
        return redirect('menu:dish_list')
    return render(request, 'menu/dish_confirm_delete.html', {'dish': dish})