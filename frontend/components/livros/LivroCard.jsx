function LivroCard({ livro, onSelecionar }) {
    return (
        <article
            className="card-livro"
            onClick={() => onSelecionar(livro)}
        >
            <div className="informacoes-livro">
                <h3>{livro.titulo}</h3>

                <div className="detalhes-livro">
                    <span>
                        Autor: {livro.autor_nome}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default LivroCard;