from django.views.generic import TemplateView
from .models import add_note


class HomePageView(TemplateView):
    template_name = "pages/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        notes = add_note("Visited home page")
        context["notes"] = notes
        return context


class AboutPageView(TemplateView):
    template_name = "pages/about.html"
