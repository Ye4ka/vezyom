from django.urls import path
from . import views

app_name = 'menu'

urlpatterns = [
    path('', views.dish_list, name='dish_list'),
    path('dishes/new/', views.dish_create, name='dish_create'),
    path('dishes/<int:pk>/', views.dish_detail, name='dish_detail'),
    path('dishes/<int:pk>/edit/', views.dish_update, name='dish_update'),
    path('dishes/<int:pk>/delete/', views.dish_delete, name='dish_delete'),
]