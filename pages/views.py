from django.views.generic import TemplateView
import os
from django.http import HttpResponse
from django.shortcuts import render
from django.views import View


class HomePageView(TemplateView):
    template_name = "pages/home.html"


class AboutPageView(TemplateView):
    template_name = "pages/about.html"


class ConnectAndRunScriptView(View):
    def get(self, request):
        return render(request, "pages/connect_and_run.html")

    def post(self, request):
        server = request.POST.get("server", "")
        username = request.POST.get("username", "")
        script = request.POST.get("script", "")
        cmd = f'ssh {username}@{server} "bash /opt/scripts/{script}.sh"'
        os.system(cmd)
        return render(request, "pages/connect_and_run.html", {"executed": True, "cmd": cmd})
