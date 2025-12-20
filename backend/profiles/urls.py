from django.urls import path
from .views import dashboard, me

urlpatterns = [
    path("dashboard/", dashboard),
    path("me/", me),
]
