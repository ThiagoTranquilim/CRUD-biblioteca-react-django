import pytest

from rest_framework.test import APIClient
from app.models import Autor


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