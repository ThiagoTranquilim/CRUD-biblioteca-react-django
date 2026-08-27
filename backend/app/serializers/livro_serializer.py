from django.utils import timezone
from rest_framework import serializers

from app.models.livro import Livro
from app.models.autor import Autor

class LivroSerializer(serializers.ModelSerializer):

    autor_id = serializers.PrimaryKeyRelatedField(
        queryset=Autor.objects.all(),
        source='autor',
        write_only=True
    )

    autor_nome = serializers.CharField(
        source='autor.nome',
        read_only=True
    )

    def validate_data_de_criacao(self, value):

        if value > timezone.localdate():
            raise serializers.ValidationError(
                "A data de criação não pode ser no futuro."
            )

        return value

    class Meta:
        model = Livro
        fields = [
            'id',
            'titulo',
            'n_paginas',
            'autor_id',
            'autor_nome',
            'genero',
            'valor',
            'data_de_criacao',

        ]