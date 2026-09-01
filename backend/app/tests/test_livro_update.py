from decimal import Decimal

import pytest
from rest_framework import status
from helpers import assert_erro_validacao

from app.models import Livro

"""

test_livro_update.py

test_atualizar_um_campo_com_sucesso()

test_atualizar_vários_campos_com_sucesso()

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
"""

nao_atualizar_n_paginas_para_zero()

nao_atualizar_valor_para_negativo()

nao_atualizar_titulo_para_um_título_ja_existente()

nao_atualizar_autor_id_para_um_autor_inexistente()

mudar_de_autor_normal_para_anônimo()

mudar_de_anônimo_para_autor_normal()

enviar_data_futura()

nao_atualizar_um_livro_inexistente()
"""

