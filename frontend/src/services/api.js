const API_BACKEND = 'http://127.0.0.1:8000'

export async function getLivros({
    pesquisa = '',
    autor = '',
    genero = '',
    ordenacao = 'titulo'
} = {}) {

    const params = new URLSearchParams()

    if(pesquisa.trim()){
        params.append('search', pesquisa.trim())
    }

    if(autor.trim()) {
        params.append(
            'autor__nome__icontains', autor.trim()
        )
    }

    if(genero.trim()) {
        params.append(
            'genero__icontains', genero.trim()
        )
    }

    if (ordenacao) {
        params.append('ordering', ordenacao)
    }

    const response = await fetch(
        `${API_BACKEND}/livro/?${params.toString()}`
    )

    if (!response.ok) {
        throw new Error('Erro ao buscar livros')
    }

    return response.json()
}

export async function postLivros(livro) {
    const response = await fetch(
        `${API_BACKEND}/livro/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        }
    )

    if (!response.ok) {
        throw new Error('Erro ao adicionar livro')
    }

    return response.json()
}

export async function deleteLivro(id) {
    const response = await fetch(
        `${API_BACKEND}/livro/${id}/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
    )

    if (!response.ok) {
        throw new Error('Erro ao excluir livro')
    }
}

export async function getAutores({
    pesquisa = '',
    nome = '',
    idade = '',
    genero_favorito = '',
    ordenacao = 'nome'
} = {}) {

    const params = new URLSearchParams()

    if(pesquisa.trim()){
        params.append('search', pesquisa.trim())
    }

    if(nome.trim()) {
        params.append(
            'autor__nome__icontains', nome.trim()
        )
    }

    if(idade.trim()) {
        params.append(
            'genero__icontains', idade.trim()
        )
    }

    if(genero_favorito.trim()) {
        params.append(
            'genero__icontains', genero_favorito.trim()
        )
    }

    if (ordenacao) {
        params.append('ordering', ordenacao)
    }

    const response = await fetch(
        `${API_BACKEND}/autor/?${params.toString()}`
    )

    if (!response.ok) {
        throw new Error('Erro ao buscar autores')
    }

    return response.json()
}

export async function postAutores(autor) {
    const response = await fetch(
        `${API_BACKEND}/autor/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(autor)
        }
    )

    if (!response.ok) {
        throw new Error('Erro ao adicionar autor')
    }

    return response.json()
}

export async function deleteAutor(id) {
    const response = await fetch(
        `${API_BACKEND}/autor/${id}/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    if (!response.ok) {
        throw new Error('Erro ao excluir autor')
    }
}