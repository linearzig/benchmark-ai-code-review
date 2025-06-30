from django.urls import path

from .views import HomePageView, AboutPageView, syscall, ConnectAndRunScriptView

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("syscall/", syscall, name="syscall"),
    path("connect-and-run/", ConnectAndRunScriptView.as_view(),
         name="connect_and_run"),
]
