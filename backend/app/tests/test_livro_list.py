from datetime import date
from decimal import Decimal

import pytest

from rest_framework import status

from app.models.livro import Livro

"""

test_livro_list.py

test_listar_quando_nao_existem_livros()
test_listagem_retorna_campos_corretos()
test_listar_varios_livros()

"""

@pytest.mark.django_db
def test_listar_quando_nao_existem_livros(
    livro_api
):
    response = livro_api.listar()

    assert response.status_code == status.HTTP_200_OK
    assert response.data == []

@pytest.mark.django_db
def test_listar_um_livro_existente(
    livro,
    livro_api
):
    response = livro_api.listar()

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1

    livro_retornado = response.data[0]

    assert livro_retornado["id"] == livro.id
    assert livro_retornado["titulo"] == livro.titulo

@pytest.mark.django_db
def test_listagem_retorna_campos_corretos(
    livro,
    livro_api
):
    response = livro_api.listar()

    livro_retornado = response.data[0]

    assert "id" in livro_retornado
    assert "titulo" in livro_retornado
    assert "n_paginas" in livro_retornado
    assert "autor_nome" in livro_retornado
    assert "genero" in livro_retornado
    assert "valor" in livro_retornado
    assert "data_de_criacao" in livro_retornado

@pytest.mark.django_db
def test_listar_varios_livros(
    livro,
    autor,
    livro_api
):
    Livro.objects.create(
        titulo="O Hobbit",
        n_paginas=310,
        autor=autor,
        genero="Fantasia",
        valor=Decimal("39.90"),
        data_de_criacao=date(1937, 9, 21)
    )

    response = livro_api.listar()

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2