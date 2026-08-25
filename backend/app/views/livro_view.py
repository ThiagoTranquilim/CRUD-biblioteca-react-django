from app.models.livros import Livro
from app.models.autor import Autor
from app.serializers.autor_serializer import AutorSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from app.serializers.livro_serializer import LivroSerializer

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class LivroListCreateView(ModelViewSet):
    queryset = Livro.objects.all().order_by('titulo')
    serializer_class = LivroSerializer

    http_method_names = ['get', 'post', 'patch', 'delete']

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = {'autor__nome': ['icontains'],
                        'genero': ['icontains']}
    ordering_fields = ['titulo', 'valor', 'data_de_criacao']
    search_fields = ['titulo']

    def perform_create(self, serializer):
        autor = Autor.objects.create(nome='AutorAnonimo', idade=99)

        autor.nome = f'AutorAnonimo{autor.id:02d}'
        autor.save()

        serializer.save(autor=autor)