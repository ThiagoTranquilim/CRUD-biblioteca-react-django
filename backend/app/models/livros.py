from django.db import models
from app.models.autor import Autor

class Livro(models.Model):
    titulo = models.CharField(max_length=100, null=False, blank=False)
    n_paginas = models.IntegerField()
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE)
    genero = models.CharField(max_length=100)
    valor = models.FloatField(null=False, blank=False)
    data_de_criacao = models.DateField()
