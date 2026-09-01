from app.models.livro import Livro
from rest_framework.viewsets import ModelViewSet

from app.serializers.livro_serializer import LivroSerializer

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class LivroListCreateView(ModelViewSet):
    queryset = Livro.objects.all().order_by('titulo')
    serializer_class = LivroSerializer

    http_method_names = ['get', 'post', 'patch', 'delete']

    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter
    ]

    filterset_fields = {
        'autor__nome': ['icontains'],
        'genero': ['icontains']
    }

    ordering_fields = [
        'titulo',
        'valor',
        'data_de_criacao'
    ]
    search_fields = ['titulo']