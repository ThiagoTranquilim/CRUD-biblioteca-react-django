class LivroAPI:

    def __init__(self, client):
        self.client = client

    def criar(self, dados):
        return self.client.post(
            "/livro/",
            dados,
            format="json"
        )

    def listar(self):
        return self.client.get(
            "/livro/"
        )

    def atualizar(self,livro_id, dados):
        return self.client.patch(
            f"/livro/{livro_id}/",
            dados,
            format="json"
        )

    def deletar(self, livro_id):
        return self.client.delete(
            f"/livro/{livro_id}/"
        )