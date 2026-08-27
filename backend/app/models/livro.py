from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal
from app.models.autor import Autor

class Livro(models.Model):

    titulo = models.CharField(
        max_length=100,
        null=False,
        blank=False,
        unique=True
    )

    n_paginas = models.IntegerField(
        validators=[MinValueValidator(1)]
    )

    autor = models.ForeignKey(
        Autor,
        on_delete=models.CASCADE
    )
    genero = models.CharField(
        max_length=100
    )
    valor = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[
            MinValueValidator(Decimal('0.01'))
        ]
    )
    data_de_criacao = models.DateField()
