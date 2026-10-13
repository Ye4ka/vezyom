from django.shortcuts import render
from .models import Dish


def dish_list(request):
    dishes = Dish.objects.select_related('restaurant', 'category')
    return render(request, 'menu/dish_list.html', {'dishes': dishes})