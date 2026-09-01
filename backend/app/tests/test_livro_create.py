import pytest
from rest_framework import status
from helpers import assert_erro_validacao

from app.models import Livro

"""

test_livro_create.py

test_criar_livro_com_dados_validos()

test_nao_criar_livro_com_campos_invalidos()

test_nao_criar_livro_sem_campo_obrigatorio()

test_nao_criar_livro_com_autor_inexistente()

test_nao_criar_livro_sem_autor_quando_nao_anonimo()

test_criar_livro_com_autor_anonimo()

test_nao_criar_livro_com_titulo_duplicado()

test_nao_criar_livro_com_data_futura()

"""

@pytest.mark.django_db
def test_criar_livro_com_dados_validos(
    dados_livro,
    livro_api,
):

    response = livro_api.criar(dados_livro)

    assert (
            response.
            status_code == status.HTTP_201_CREATED
        )


# =================================
# CAMPOS COM VALORES INVÁLIDOS
# =================================

@pytest.mark.parametrize(
    "campo,valor_invalido,mensagem",
    [
        pytest.param(
            "titulo",
            "",
            "O título é obrigatório.",
            id="titulo-vazio"
        ),
        pytest.param(
            "n_paginas",
            "",
            "Informe um número de páginas válido.",
            id="paginas-vazio"
        ),
        pytest.param(
            "n_paginas",
            None,
            "O número de páginas é obrigatório.",
            id="paginas-null"
        ),
        pytest.param(
            "n_paginas",
            0,
            "O número de páginas deve ser maior que zero.",
            id="paginas-zero"
        ),
        pytest.param(
            "n_paginas",
            -10,
            "O número de páginas deve ser maior que zero.",
            id="paginas-negativo"
        ),
        pytest.param(
            "n_paginas",
            "abc",
            "Informe um número de páginas válido.",
            id="paginas-texto"
        ),
        pytest.param(
            "valor",
            "",
            "Informe um valor válido.",
            id="valor-vazio"
        ),
        pytest.param(
            "valor",
            None,
            "O valor é obrigatório.",
            id="valor-null"
        ),
        pytest.param(
            "valor",
            -1,
            "O valor não pode ser negativo.",
            id="valor-negativo"
        ),
        pytest.param(
            "valor",
            "abc",
            "Informe um valor válido.",
            id="valor-texto"
        ),
    ]
)

@pytest.mark.django_db
def test_nao_criar_livro_com_campos_invalidos(
    dados_livro,
    livro_api,
    campo,
    valor_invalido,
    mensagem
):
    dados_livro[campo] = valor_invalido

    quantidade_antes = Livro.objects.count()

    response = livro_api.criar(dados_livro)

    assert_erro_validacao(
        response,
        campo,
        mensagem
    )

    assert Livro.objects.count() == quantidade_antes

# =================================
# CAMPOS OBRIGATÓRIOS SEM ENVIO
# =================================

@pytest.mark.parametrize(
        "campo,mensagem",
        [
            pytest.param(
                "titulo",
                "O título é obrigatório.",
                id="sem-paginas"
            ),
            pytest.param(
                "valor",
                "O valor é obrigatório.",
                id="sem-valor"
            ),
        ]
)

@pytest.mark.django_db
def test_nao_criar_livro_sem_campos_obrigatorios(
    dados_livro,
    livro_api,
    campo,
    mensagem
):
    dados_livro.pop(campo)

    quantidade_antes = Livro.objects.count()

    response = livro_api.criar(dados_livro)

    assert_erro_validacao(
        response,
        campo,
        mensagem
    )

    assert Livro.objects.count() == quantidade_antes


@pytest.mark.django_db
def test_nao_criar_livro_com_autor_inexistente(
        dados_livro,
        livro_api
):
    dados_livro["autor_id"] = 999999

    quantidade_antes = Livro.objects.count()

    response = livro_api.criar(dados_livro)

    assert_erro_validacao(
        response=response,
        campo="autor_id",
        mensagem="O autor informado não existe."
    )
    assert Livro.objects.count() == quantidade_antes


@pytest.mark.django_db
def test_nao_criar_livro_sem_autor_quando_nao_anonimo(
    dados_livro,
    livro_api
):
    dados_livro["autor_id"] = None
    dados_livro["anonimo"] = False

    quantidade_antes = Livro.objects.count()

    response = livro_api.criar(dados_livro)

    assert_erro_validacao(
        response=response,
        campo="autor_id",
        mensagem="O autor deve ser fornecido."
    )

    assert Livro.objects.count() == quantidade_antes

@pytest.mark.django_db
def test_criar_livro_com_autor_anonimo(
    dados_livro,
    livro_api
):
    dados_livro.pop("autor_id")
    dados_livro["anonimo"] = True

    response = livro_api.criar(dados_livro)

    assert response.status_code == status.HTTP_201_CREATED

    livro = Livro.objects.get(
        titulo=dados_livro["titulo"]
    )

    assert livro.autor.nome == "Anônimo"

@pytest.mark.django_db
def test_nao_criar_livro_com_titulo_duplicado(
    dados_livro,
    livro_api
):
    primeira_response = livro_api.criar(dados_livro)

    assert primeira_response.status_code == status.HTTP_201_CREATED

    response_duplicado = livro_api.criar(dados_livro)

    assert_erro_validacao(
        response=response_duplicado,
        campo="titulo",
        mensagem="Já existe um livro com este título."
    )


@pytest.mark.django_db
def test_nao_criar_livro_com_data_futura(
    dados_livro,
    livro_api
):
    dados_livro["data_de_criacao"] = "2030-01-01"

    response = livro_api.criar(dados_livro)

    assert_erro_validacao(
        response=response,
        campo="data_de_criacao",
        mensagem="A data de criação não pode ser no futuro."
    )