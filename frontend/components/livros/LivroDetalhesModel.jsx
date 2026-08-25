function LivroDetalhesModal({
    livro,
    onFechar,
    onExcluir,
}) {
    if (!livro) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="modal">
                <h2>{livro.titulo}</h2>

                <div className="detalhes">
                    <div className="detalhe">
                        <span>ID</span>
                        <strong>
                            {livro.id}
                        </strong>
                    </div>

                    <div className="detalhe">
                        <span>Autor</span>
                        <strong>
                            {livro.autor_nome}
                        </strong>
                    </div>

                    <div className="detalhe">
                        <span>Gênero</span>
                        <strong>
                            {livro.genero}
                        </strong>
                    </div>

                    <div className="detalhe">
                        <span>
                            Número de páginas
                        </span>

                        <strong>
                            {livro.n_paginas}
                        </strong>
                    </div>

                    <div className="detalhe">
                        <span>Valor</span>

                        <strong>
                            R$ {livro.valor}
                        </strong>
                    </div>

                    <div className="detalhe">
                        <span>
                            Data de criação
                        </span>

                        <strong>
                            {livro.data_de_criacao}
                        </strong>
                    </div>
                </div>

                <button
                    className="botao-excluir-modal"
                    onClick={onExcluir}
                >
                    Excluir
                </button>

                <button
                    className="botao-fechar-modal"
                    onClick={onFechar}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default LivroDetalhesModal;