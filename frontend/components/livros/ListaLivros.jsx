import LivroCard from "./LivroCard";

function ListaLivros({
    livros,
    totalLivros,
    loading,
    erro,
    onSelecionar
}) {
    return (
        <section className="conteudo">
            <div className="titulo-lista">
                <h2>Livros cadastrados</h2>
            </div>

            {loading && (
                <div className="estado">
                    <div className="spinner"></div>

                    <p>Carregando livros...</p>
                </div>
            )}

            {!loading && erro && (
                <div className="erro">
                    <p>{erro}</p>
                </div>
            )}

            {!loading &&
                !erro &&
                totalLivros === 0 && (
                    <div className="estado">
                        <h3>
                            Nenhum livro encontrado
                        </h3>

                        <p>
                            Ainda não existem livros
                            cadastrados.
                        </p>
                    </div>
                )}

            {!loading &&
                !erro &&
                totalLivros > 0 &&
                livros.length === 0 && (
                    <div className="estado">
                        <h3>
                            Nenhum livro encontrado
                        </h3>

                        <p>
                            Nenhum livro corresponde aos
                            filtros selecionados.
                        </p>
                    </div>
                )}

            {!loading &&
                !erro &&
                livros.length > 0 && (
                    <div className="lista-livros">
                        {livros.map((livro) => (
                            <LivroCard
                                key={livro.id}
                                livro={livro}
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

export default ListaLivros;