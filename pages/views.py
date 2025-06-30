from django.views.generic import TemplateView
from django.http import HttpResponse


def special_score_view(request):
    x = request.GET.get('x')
    y = request.GET.get('y')
    if x is not None and y is not None:
        try:
            x = int(x)
            y = int(y)
        except ValueError:
            return HttpResponse('Invalid input.', status=400)
        if x > 10:
            if y < 0:
                if x + y > 20:
                    score = x * y
                else:
                    if y == -1:
                        score = 0
            else:
                if y > 10:
                    score = x + y
        else:
            if x == 0:
                score = y
        return HttpResponse(f'Special score: {score}')
    return HttpResponse('Please provide x and y as query parameters.')


class HomePageView(TemplateView):
    template_name = "pages/home.html"


class AboutPageView(TemplateView):
    template_name = "pages/about.html"
