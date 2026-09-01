import pytest

from rest_framework import status

from app.models.autor import Autor
from app.models.livro import Livro

"""

test_livro_delete.py

test_deletar_livro_com_sucesso()

test_nao_deletar_livro_inexistente()

test_deletar_livro_nao_deleta_autor()

"""

@pytest.mark.django_db
def test_deletar_livro_com_sucesso(
    livro,
    livro_api
):
    livro_id = livro.id

    response = livro_api.deletar(
        livro_id
    )

    assert (
        response.status_code
        == status.HTTP_204_NO_CONTENT
    )

    assert not Livro.objects.filter(
        id=livro_id
    ).exists()


@pytest.mark.django_db
def test_nao_deletar_livro_inexistente(
    livro_api
):
    response = livro_api.deletar(
        999999
    )

    assert (
        response.status_code
        == status.HTTP_404_NOT_FOUND
    )


@pytest.mark.django_db
def test_deletar_livro_nao_deleta_autor(
    livro,
    livro_api
):
    autor_id = livro.autor_id

    response = livro_api.deletar(
        livro.id
    )

    assert (
        response.status_code
        == status.HTTP_204_NO_CONTENT
    )

    assert Autor.objects.filter(
        id=autor_id
    ).exists()