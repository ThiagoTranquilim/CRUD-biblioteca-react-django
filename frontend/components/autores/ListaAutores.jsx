import AutorCard from "./AutorCard";

function ListaAutores({
    autores,
    totalAutores,
    loading,
    erro,
    onSelecionar
}) {
    return (
        <section className="conteudo">
            <div className="titulo-lista">
                <h2>Autores cadastrados</h2>
            </div>

            {loading && (
                <div className="estado">
                    <div className="spinner"></div>

                    <p>Carregando autores...</p>
                </div>
            )}

            {!loading && erro && (
                <div className="erro">
                    <p>{erro}</p>
                </div>
            )}

            {!loading &&
                !erro &&
                totalAutores === 0 && (
                    <div className="estado">
                        <h3>
                            Nenhum autor encontrado
                        </h3>

                        <p>
                            Ainda não existem autores
                            cadastrados.
                        </p>
                    </div>
                )}

            {!loading &&
                !erro &&
                totalAutores > 0 &&
                autores.length === 0 && (
                    <div className="estado">
                        <h3>
                            Nenhum autor encontrado
                        </h3>

                        <p>
                            Nenhum autor corresponde aos
                            filtros selecionados.
                        </p>
                    </div>
                )}

            {!loading &&
                !erro &&
                autores.length > 0 && (
                    <div className="lista-autores">
                        {autores.map((autor) => (
                            <AutorCard
                                key={autor.id}
                                autor={autor}
                                onSelecionar={
                                    onSelecionar
                                }
                            />
                        ))}
                    </div>
                )}
        </section>
    );
}

export default ListaAutores;