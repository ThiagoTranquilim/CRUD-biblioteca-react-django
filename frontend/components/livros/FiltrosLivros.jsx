function FiltrosLivros({
    pesquisa,
    setPesquisa,
    autor,
    setAutor,
    genero,
    setGenero
}) {
    return (
        <section className="filtros">
            <div className="campo-pesquisa">
                <input
                    type="text"
                    placeholder="Pesquisar por título"
                    value={pesquisa}
                    onChange={(event) =>
                        setPesquisa(event.target.value)
                    }
                />
            </div>

            <div className="controles">
                <div className="campo">
                    <label>Autor</label>

                    <input
                        type="text"
                        placeholder="Nome do autor"
                        value={autor}
                        onChange={(event) =>
                            setAutor(event.target.value)
                        }
                    />
                </div>

                <div className="campo">
                    <label>Gênero</label>

                    <input
                        type="text"
                        placeholder="Gênero"
                        value={genero}
                        onChange={(event) =>
                            setGenero(event.target.value)
                        }
                    />
                </div>
            </div>
        </section>
    );
}

export default FiltrosLivros;