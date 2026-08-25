function AutorDetalhesModal({
    autor,
    onFechar,
    onExcluir,
}) {
    if (!autor) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="modal">
                <h2>{autor.nome}</h2>

                <div className="detalhes">
                    <div className="detalhe">
                        <span>ID</span>
                        <strong>
                            {autor.id}
                        </strong>
                    </div>

                    <div className="detalhe">
                        <span>Idade</span>
                        <strong>
                            {autor.idade}
                        </strong>
                    </div>

                    <div className="detalhe">
                        <span>Gênero favorito</span>
                        <strong>
                            {autor.genero_favorito}
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

export default AutorDetalhesModal;