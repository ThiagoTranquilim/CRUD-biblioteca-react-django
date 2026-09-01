from rest_framework import status

# A ideia do helper ser uma função reutilizável
# Executa ou verifica algo repetitivo

def assert_erro_validacao(
        response,
        campo,
        mensagem
):
    assert (
        response.
        status_code == status.HTTP_400_BAD_REQUEST
    )

    assert campo in response.data

    mensagem_recebida = str(
        response.data[campo][0]
    )

    assert mensagem_recebida == mensagem, (
        f"\nMensagem esperada: {mensagem!r}"
        f"\nMensagem recebida: {mensagem_recebida!r}"
    )