function OrdenacaoLivros({
    campoOrdenacao,
    setCampoOrdenacao,
    direcaoOrdenacao,
    setDirecaoOrdenacao
}) {
    return (
        <section className="ordenacao">
            <span className="label-ordenacao">
                Ordenar por
            </span>

            <div className="botoes-ordenacao">
                <button
                    className={
                        campoOrdenacao === "titulo"
                            ? "botao-ordenacao ativo"
                            : "botao-ordenacao"
                    }
                    onClick={() =>
                        setCampoOrdenacao("titulo")
                    }
                >
                    Título
                </button>

                <button
                    className={
                        campoOrdenacao === "valor"
                            ? "botao-ordenacao ativo"
                            : "botao-ordenacao"
                    }
                    onClick={() =>
                        setCampoOrdenacao("valor")
                    }
                >
                    Valor
                </button>

                <button
                    className={
                        campoOrdenacao === "data_de_criacao"
                            ? "botao-ordenacao ativo"
                            : "botao-ordenacao"
                    }
                    onClick={() =>
                        setCampoOrdenacao("data_de_criacao")
                    }
                >
                    Data de criação
                </button>
            </div>

            <div className="direcao-ordenacao">
                <button
                    className={
                        direcaoOrdenacao === "asc"
                            ? "botao-direcao ativo"
                            : "botao-direcao"
                    }
                    onClick={() =>
                        setDirecaoOrdenacao("asc")
                    }
                >
                    Crescente
                </button>

                <button
                    className={
                        direcaoOrdenacao === "desc"
                            ? "botao-direcao ativo"
                            : "botao-direcao"
                    }
                    onClick={() =>
                        setDirecaoOrdenacao("desc")
                    }
                >
                    Decrescente
                </button>
            </div>
        </section>
    );
}

export default OrdenacaoLivros;