"""
URL configuration for map_of_contemporaries project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from contemporaries_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('random_person/', views.random_person, name='random_person'),
    path('search_person/', views.search_person, name='search_person'),
    path('top_overlap/<int:person_id>/', views.top_overlap, name='top_overlap'),
    path('fame_overlap/<int:person_id>/',
         views.fame_overlap, name='fame_overlap'),
]
