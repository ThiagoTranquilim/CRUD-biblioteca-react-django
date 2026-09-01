from datetime import date
from decimal import Decimal

import pytest

from rest_framework.test import APIClient
from app.tests.clients.livro_api import LivroAPI
from app.models import Autor, Livro


# As fixtures são usadas para preparar o ambiente,
# criar dados ou configurar recursos necessários


# Simula requisições HTTP aos endpoints
# da API durante os testes
@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def livro_api(api_client):
    return LivroAPI(api_client)


@pytest.fixture
def autor(db):
    return Autor.objects.create(
        nome="J. R. R. Tolkien",
        idade=81,
        genero_favorito="Fantasia"
    )

@pytest.fixture
def livro(autor):

    # Representa um registro real no banco

    return Livro.objects.create(
        titulo="O Senhor dos Anéis",
        n_paginas=1216,
        autor=autor,
        genero="Fantasia",
        valor=Decimal("59.90"),
        data_de_criacao=date(1954, 7, 29)
    )



@pytest.fixture
def dados_livro(autor):
    # Diferente de livro
    # dados_livro representa o payload da API

    return {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": 1216,
        "autor_id": autor.id,
        "anonimo": False,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }