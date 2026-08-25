from django.urls import path
from rest_framework.routers import DefaultRouter

from app.views.autor_view import AutorListCreateView


from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from app.views.livro_view import LivroListCreateView

router = DefaultRouter()
router.register(r'autor', AutorListCreateView, basename='autores')
router.register(r'livro', LivroListCreateView, basename='livros')
router.register(r'uaretheauthor', LivroListCreateView, basename='uaretheauthor')

urlpatterns = [
    *router.urls,
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

