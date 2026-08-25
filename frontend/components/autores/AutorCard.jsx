function AutorCard({ autor, onSelecionar }) {
    return (
        <article
            className="card-autor"
            onClick={() => onSelecionar(autor)}
        >
            <div className="informacoes-autor">
                <h3>{autor.nome}</h3>

            </div>
        </article>
    );
}

export default AutorCard;