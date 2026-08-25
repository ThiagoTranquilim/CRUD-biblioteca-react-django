from rest_framework import serializers
from app.models.livros import Livro

class LivroSerializer(serializers.ModelSerializer):

    ## Por aqui a lista de livros vai para o frontend ordenada
    autor_nome = serializers.SerializerMethodField()
    def get_autor_nome(self, data):
        print(data.autor)
        return data.autor.nome

    class Meta:
        model = Livro
        fields = [
            'id',
            'titulo',
            'n_paginas',
            'genero',
            'valor',
            'data_de_criacao',
            'autor_nome'
        ]
        read_only_fields = ['autor']