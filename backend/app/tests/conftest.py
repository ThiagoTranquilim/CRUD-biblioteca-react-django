import pytest

from rest_framework.test import APIClient
from app.models import Autor


# As fixtures são usadas para preparar o ambiente,
# criar dados ou configurar recursos necessários


# Simula requisições HTTP aos endpoints
# da API durante os testes
@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def autor():
    return Autor.objects.create(
        nome="J. R. R. Tolkien",
        idade=81,
        genero_favorito="Fantasia"
    )

@pytest.fixture
def dados_livro(autor):
    return {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": 1216,
        "autor_id": autor.id,
        "anonimo": False,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }

@pytest.fixture
def post_livro(api_client):
    def _post_livro(dados):
        return api_client.post(
            "/livro/",
            dados,
            format="json"
        )
    return _post_livro

@pytest.fixture
def get_livros(api_client):
    def _get_livros():
        return api_client.get(
            "/livro/",
            format="json"
        )
    return _get_livros

@pytest.fixture
def patch_livro(api_client):
    def _patch_livro():
        return api_client.patch(
            "/livro/",
            format="json"
        )
    return _patch_livro

@pytest.fixture
def delete_livro(api_client):
    def _delete_livro():
        return api_client.delete(
            "/livro/",
            format="json"
        )
    return _delete_livro