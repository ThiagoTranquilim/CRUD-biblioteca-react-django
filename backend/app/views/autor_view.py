from app.models.autor import Autor
from app.serializers.autor_serializer import AutorSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from django_filters.rest_framework import DjangoFilterBackend


class AutorListCreateView(ModelViewSet):

    queryset = Autor.objects.all().order_by('nome')
    serializer_class = AutorSerializer

    http_method_names = ['get', 'post', 'patch', 'delete']

    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'nome': ['icontains'], 'idade': ['exact']}
    ordering_fields = ['nome', 'idade']
    search_fields = ['nome']