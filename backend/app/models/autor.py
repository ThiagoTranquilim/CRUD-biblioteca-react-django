from django.db import models

class Autor(models.Model):
    nome = models.CharField(max_length=100, null=False, blank=False)
    idade = models.IntegerField()
    genero_favorito = models.CharField(max_length=100)