function OrdenacaoAutores({
    campoOrdenacao,
    direcaoOrdenacao,
    setValue
}) {

    return (

        <section className="ordenacao">

            <span className="label-ordenacao">
                Ordenar por
            </span>


            <div className="botoes-ordenacao">

                <button
                    type="button"
                    className={
                        campoOrdenacao === "nome"
                            ? "botao-ordenacao ativo"
                            : "botao-ordenacao"
                    }
                    onClick={() =>
                        setValue(
                            "campoOrdenacao",
                            "nome"
                        )
                    }
                >
                    Nome
                </button>


                <button
                    type="button"
                    className={
                        campoOrdenacao === "idade"
                            ? "botao-ordenacao ativo"
                            : "botao-ordenacao"
                    }
                    onClick={() =>
                        setValue(
                            "campoOrdenacao",
                            "idade"
                        )
                    }
                >
                    Idade
                </button>

            </div>


            <div className="direcao-ordenacao">

                <button
                    type="button"
                    className={
                        direcaoOrdenacao === "asc"
                            ? "botao-direcao ativo"
                            : "botao-direcao"
                    }
                    onClick={() =>
                        setValue(
                            "direcaoOrdenacao",
                            "asc"
                        )
                    }
                >
                    Crescente
                </button>


                <button
                    type="button"
                    className={
                        direcaoOrdenacao === "desc"
                            ? "botao-direcao ativo"
                            : "botao-direcao"
                    }
                    onClick={() =>
                        setValue(
                            "direcaoOrdenacao",
                            "desc"
                        )
                    }
                >
                    Decrescente
                </button>

            </div>

        </section>
    );
}


export default OrdenacaoAutores;