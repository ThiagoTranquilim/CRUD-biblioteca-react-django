import pytest
from rest_framework import status
from helpers import assert_erro_validacao

from app.models import Livro


"""

Serializer

└>  valida entrada
└>  retorna mensagens de erro previsíveis
└>  aplica regras como autor/anônimo

Model

└>  protege regras fundamentais dos dados

APIClient tests

└>  verifica status HTTP
└>  verifica response.data
└>  verifica banco de dados

========================================================

Refatorar agora o
POST com dados_livro
como fixture + pytest.mark.parametrize
para campos inválidos + testes separados
para a regra anonimo/autor.

=========================================================

tests/

test_livro_create.py

└>  POST válido
    └>  validações parametrizadas
    └>  autor inexistente
    └>  autor anônimo
    └>  livro normal sem autor
    └>  livro com título duplicado

test_livro_list.py

└>  GET
└>  filtros
└>  ordenação

test_livro_update.py

└>  PATCH válido
└>  PATCH inválido

test_livro_delete.py

└>  DELETE válido
└>  DELETE inexistente

"""

@pytest.mark.django_db
@pytest.mark.parametrize(
    "campo,valor_invalido,mensagem",
    [
        (
            "titulo",
            "",
            "O título é obrigatório."
        ),
        (
            "n_paginas",
            0,
            "O número de páginas deve ser maior que zero."
        ),
        (
            "n_paginas",
            -10,
            "O número de páginas deve ser maior que zero."
        ),
        (
            "valor",
            -1,
            "O valor não pode ser negativo."
        ),
    ]
)


# Preciso sempre verificar 3 coisas
# assert response.status_code
# assert campo in response.data
# assert str(response.data[campo][0]==mensagem)
# uso o assert_erro_validacao para isso

# caso POST
# assert Livro.objects.count() == 0
# quando realmente nenhum livro deveria ter sido criado
def test_nao_criar_livro_com_campos_invalidos(
    dados_livro,
    campo,
    valor_invalido,
    mensagem,
    post_livro
):
    dados_livro[campo] = valor_invalido

    response = post_livro(dados_livro)

    assert_erro_validacao(
        response,
        campo,
        mensagem
    )

    assert Livro.objects.count() == 0

@pytest.mark.django_db
def test_nao_criar_livro_com_autor_inexistente(
        dados_livro,
        post_livro
):
    dados_livro["autor_id"] = 999999

    quantidade_antes = Livro.objects.count()

    response = post_livro(dados_livro)

    assert_erro_validacao(
        response=response,
        campo="autor_id",
        mensagem="O autor informado não existe."
    )
    assert Livro.objects.count() == quantidade_antes