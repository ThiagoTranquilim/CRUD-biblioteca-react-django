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