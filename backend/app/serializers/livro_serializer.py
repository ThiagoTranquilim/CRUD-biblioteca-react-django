from decimal import Decimal

from django.utils import timezone

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from app.models.autor import Autor
from app.models.livro import Livro


class LivroSerializer(serializers.ModelSerializer):

    titulo = serializers.CharField(
        max_length=100,
        validators=[
            UniqueValidator(
                queryset=Livro.objects.all(),
                message="Já existe um livro com este título."
            )
        ],
        error_messages={
            "required": "O título é obrigatório.",
            "blank": "O título é obrigatório.",
            "max_length":
                "O título deve possuir no máximo 100 caracteres."
        }
    )

    autor_id = serializers.PrimaryKeyRelatedField(
        queryset=Autor.objects.all(),
        source='autor',
        write_only=True,
        required=False,
        allow_null=True,
        error_messages={
            "does_not_exist": "O autor informado não existe.",
            "incorrect_type": "O autor informado é inválido."
        }
    )


    anonimo = serializers.BooleanField(
        write_only=True,
        default=False
    )


    autor_nome = serializers.CharField(
        source='autor.nome',
        read_only=True
    )


    class Meta:
        model = Livro
        fields = [
            'id',
            'titulo',
            'n_paginas',
            'autor_id',
            'autor_nome',
            'anonimo',
            'genero',
            'valor',
            'data_de_criacao',

        ]

        extra_kwargs = {

            "n_paginas": {
                "min_value": 1,
                "error_messages": {

                    "required":
                        "O número de páginas é obrigatório.",
                    "null":
                        "O número de páginas é obrigatório.",
                    "invalid":
                        "Informe um número de páginas válido.",
                    "min_value":
                        "O número de páginas deve ser maior que zero."
                }
            },

            "valor": {
                "min_value": Decimal("0.00"),
                "error_messages": {

                    "required":
                        "O valor é obrigatório.",
                    "null":
                        "O valor é obrigatório.",
                    "invalid":
                        "Informe um valor válido.",
                    "min_value":
                        "O valor não pode ser negativo.",
                }
            }
        }





    def validate_data_de_criacao(self, value):

        if value > timezone.localdate():
            raise serializers.ValidationError(
                "A data de criação não pode ser no futuro."
            )

        return value





    def validate(self, attrs):

        anonimo = attrs.get("anonimo", False)
        autor = attrs.get("autor")

        if self.instance and "autor" not in attrs:
            autor = self.instance.autor

        if not anonimo and not autor:
            raise serializers.ValidationError({
                "autor_id": "O autor deve ser fornecido."
            })

        return attrs





    def create(self, validated_data):

        anonimo = validated_data.pop("anonimo", False)

        if anonimo:
            validated_data["autor"] = self._obter_autor_anonimo()

        return Livro.objects.create(**validated_data)






    def update(self, instance, validated_data):

        anonimo = validated_data.pop("anonimo", False)

        if anonimo:
            validated_data["autor"] = self._obter_autor_anonimo()


        return super().update(
            instance,
            validated_data
        )






    def _obter_autor_anonimo(self):

        autor, _ = Autor.objects.get_or_create(
            nome="Anônimo",
            defaults={
                "idade": 0,
                "genero_favorito": "?"
            }
        )

        return autor