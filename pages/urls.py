from django.urls import path

from .views import HomePageView, AboutPageView, special_score_view

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("special-score/", special_score_view, name="special_score"),
]
