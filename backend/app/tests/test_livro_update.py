from decimal import Decimal

import pytest
from rest_framework import status
from helpers import assert_erro_validacao

from app.models import Livro, Autor

"""

test_livro_update.py

test_atualizar_um_campo_com_sucesso()

test_atualizar_varios_campos_com_sucesso()

test_nao_atualizar_n_paginas_para_zero()

test_nao_atualizar_valor_para_negativo()

test_nao_atualizar_titulo_para_um_título_ja_existente()

test_nao_atualizar_autor_id_para_um_autor_inexistente()

test_mudar_de_autor_normal_para_anônimo()

test_mudar_de_anônimo_para_autor_normal()

test_enviar_data_futura()

test_nao_atualizar_um_livro_inexistente()

garantir que um PATCH parcial não exija campos que já existem no objeto

"""

@pytest.mark.django_db
def test_atualizar_um_campo_com_sucesso(
    livro,
    livro_api
):
    novo_valor = Decimal("79.90")

    response = livro_api.atualizar(
        livro.id,
        {
            "valor": novo_valor
        }
    )

    livro.refresh_from_db()

    assert livro.valor == novo_valor

    assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
def teste_atualizar_varios_campos_com_sucesso(
    livro,
    livro_api
):

    autor_original = livro.autor
    data_original = livro.data_de_criacao

    dados_atualizacao = {
        "titulo": "Edição Especial",
        "n_paginas": 1500,
        "genero": "Genero-teste",
        "valor": Decimal("89.90")
    }

    response = livro_api.atualizar(
        livro.id,
        dados_atualizacao
    )

    assert response.status_code == status.HTTP_200_OK

    livro.refresh_from_db()

    assert livro.titulo == dados_atualizacao["titulo"]
    assert livro.n_paginas == dados_atualizacao["n_paginas"]
    assert livro.genero == dados_atualizacao["genero"]
    assert livro.valor == dados_atualizacao["valor"]

    assert livro.autor == autor_original
    assert str(livro.data_de_criacao) == str(data_original)


@pytest.mark.django_db
def test_nao_atualizar_n_paginas_para_zero(
    livro,
    livro_api
):

    response = livro_api.atualizar(
            livro.id,
            {
                "n_paginas": 0
            }
        )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_nao_atualizar_valor_para_negativo(
    livro,
    livro_api
):

    response = livro_api.atualizar(
        livro.id,
        {
            "valor": Decimal("-10.00")
        }
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_nao_atualizar_titulo_para_um_titulo_ja_existente(
    livro,
    livro_api,
    autor,
):
    primeiro_livro = Livro.objects.create(
        titulo="Titulo Existente",
        n_paginas=100,
        genero="Genero-teste",
        valor=Decimal("49.90"),
        autor=autor,
        data_de_criacao="2023-01-01"
    )

    titulo_original = livro.titulo

    response = livro_api.atualizar(
        livro.id,
        {
            "titulo": primeiro_livro.titulo
        }
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    assert "titulo" in response.data

    livro.refresh_from_db()

    assert livro.titulo == titulo_original


@pytest.mark.django_db
def test_nao_atualizar_autor_id_para_um_autor_inexistente(
    livro,
    livro_api
):

    # autor_id_original = livro.autor.id

    response = livro_api.atualizar(
        livro.id,
        {
            "autor_id": 9999
        }
    )

    # print("STATUS: ", response.status_code)
    # print("RESPOSTA: ", response.data)

    assert_erro_validacao(
        response,
        "autor_id",
        "O autor informado não existe."
    )

    livro.refresh_from_db()

    # print("AUTOR ORIGINAL: ", autor_id_original)
    # print("AUTOR DEPOIS: ", livro.autor_id)

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_mudar_de_autor_normal_para_anonimo(
    livro,
    livro_api
):
    autor_original = livro.autor

    response = livro_api.atualizar(
        livro.id,
        {
            "anonimo": True
        }
    )

    assert response.status_code == status.HTTP_200_OK

    livro.refresh_from_db()

    assert livro.autor.nome == "Anônimo"
    assert livro.autor != autor_original

    assert Autor.objects.filter(
        id=autor_original.id
    ).exists()


@pytest.mark.django_db
def test_mudar_de_anônimo_para_autor_normal(
    livro,
    livro_api,
):

    livro_api.atualizar(
        livro.id,
        {
            "anonimo": True
        }
    )


    response = livro_api.atualizar(
        livro.id,
        {
            "anonimo": False,
            "autor_id": livro.autor.id
        }
    )

    assert response.status_code == status.HTTP_200_OK

    livro.refresh_from_db()

    assert livro.autor.nome != "Anônimo"


@pytest.mark.django_db
def test_enviar_data_futura(
    livro,
    livro_api
):
    response = livro_api.atualizar(
        livro.id,
        {
            "data_de_criacao": "2050-01-01"
        }
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    assert_erro_validacao(
        response,
        "data_de_criacao",
        "A data de criação não pode ser no futuro."
    )


@pytest.mark.django_db
def test_nao_atualizar_um_livro_inexistente(
    livro_api
):
    response = livro_api.atualizar(
        9999,
        {
            "titulo": "Novo Título"
        }
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND