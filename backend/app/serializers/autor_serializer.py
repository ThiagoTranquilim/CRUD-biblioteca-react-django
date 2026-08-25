from rest_framework import serializers
from app.models.autor import Autor

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = [
            'id',
            'nome',
            'idade',
            'genero_favorito'
        ]