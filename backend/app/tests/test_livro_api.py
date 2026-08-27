import pytest

from app.models import Livro

"""
POST	dados válidos	    201 V
POST	título ausente	    400 V
POST	título vazio	    400 V
POST	páginas negativas	400 V
POST	valor negativo	    400 V
POST	data inválida	    400 V
POST	autor existente	    201 V
POST	autor inexistente	400 V
GET	    lista livros	    200
GET	    livro existente	    200
GET	    livro inexistente	404
PATCH	alteração válida	200
PATCH	alteração inválida	400
PATCH	livro inexistente	404
DELETE	livro existente	    204
DELETE	livro inexistente	404
"""


# POST DADOS VÁLIDOS 201
@pytest.mark.django_db
def test_criar_livro_com_dados_validos(api_client, autor):

    dados = {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": 1216,
        "autor_id": autor.id,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 201

    livro = Livro.objects.get()

    assert livro.titulo == "O Senhor dos Anéis"
    assert livro.n_paginas == 1216
    assert livro.autor == autor
    assert livro.genero == "Fantasia"


# POST TÍTULO AUSENTE 400
@pytest.mark.django_db
def test_criar_livro_com_titulo_ausente(api_client, autor):

    dados = {
        "n_paginas": 1216,
        "autor_id": autor.id,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 400


# POST	TÍTULO VAZIO	    400
@pytest.mark.django_db
def test_criar_livro_com_titulo_vazio(api_client, autor):

    dados = {
        "titulo": "",
        "n_paginas": 1216,
        "autor_id": autor.id,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 400


# POST	PÁGINAS NEGATIVAS	400
@pytest.mark.django_db
def test_criar_livro_com_paginas_negativas(api_client, autor):

    dados = {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": -1216,
        "autor_id": autor.id,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 400


# POST VALOR NEGATIVO	    400
@pytest.mark.django_db
def test_criar_livro_com_valor_negativo(api_client, autor):

    dados = {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": 1216,
        "autor_id": autor.id,
        "genero": "Fantasia",
        "valor": -59.90,
        "data_de_criacao": "1954-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 400


# POST	DATA INVÁLIDA	    400
@pytest.mark.django_db
def test_criar_livro_com_data_invalida(api_client, autor):
    dados = {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": 1216,
        "autor_id": autor.id,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "2054-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 400


# POST	AUTOR INEXISTENTE	400
@pytest.mark.django_db
def test_criar_livro_com_autor_inexistente(api_client):

    dados = {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": 1216,
        "autor_id": 999,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 400


# POST    AUTOR EXISTENTE	    201
@pytest.mark.django_db
def test_criar_livro_com_autor_existente(api_client, autor):

    dados = {
        "titulo": "O Senhor dos Anéis",
        "n_paginas": 1216,
        "autor_id": autor.id,
        "genero": "Fantasia",
        "valor": 59.90,
        "data_de_criacao": "1954-07-29"
    }

    response = api_client.post(
        "/livro/",
        dados,
        format="json"
    )

    assert response.status_code == 201

# GET	    LISTA LIVROS	    200
@pytest.mark.django_db
def test_listar_livros(api_client, autor):

    Livro.objects.create(
        titulo="O Senhor dos Anéis",
        n_paginas=1216,
        autor=autor,
        genero="Fantasia",
        valor=59.90,
        data_de_criacao="1954-07-29"
    )

    response = api_client.get("/livro/")

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["titulo"] == "O Senhor dos Anéis"


# GET	    LIVRO EXISTENTE	    200
@pytest.mark.django_db
def test_obter_livro_existente(api_client, autor):

    livro = Livro.objects.create(
        titulo="O Senhor dos Anéis",
        n_paginas=1216,
        autor=autor,
        genero="Fantasia",
        valor=59.90,
        data_de_criacao="1954-07-29"
    )

    response = api_client.get(f"/livro/{livro.id}/")

    assert response.status_code == 200
    assert response.data["titulo"] == "O Senhor dos Anéis"

# GET	    LIVRO INEXISTENTE	404
@pytest.mark.django_db
def test_obter_livro_inexistente(api_client):
    response = api_client.get("/livro/999/")
    assert response.status_code == 404