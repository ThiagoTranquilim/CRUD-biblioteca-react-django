import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { getAutores } from "../../src/services/api";

const LivroInicial = {
    titulo: "",
    n_paginas: "",
    genero: "",
    valor: "",
    data_de_criacao: "",
    anonimo: false,
    autor_id: ""
};

function ErroCampo({ erro }) {
        if (!erro) return null;

        return (
            <div className="erro">
                <p>{erro.message}</p>
            </div>
        );
}

/*

Validações nos inputs

*/
const validacoes = {
    titulo: {
        required:
            "O título é obrigatório.",

        minLength: {

            value: 2,
            message:

                "O títuo deve possuir pelo menos 2 caracteres."
        }
    },

    n_paginas: {

        required:
            "O número de páginas é obrigatório.",

            valueAsNumber: true,

            min:{

                value: 1,
                message:

                    "O número de páginas deve er maior que 0."
            }

    },

    genero: {

        required:
            "O gênero é obrigatório.",

            minLength: {
                value: 2,
                message:

                    "O gênero deve possuir pelo menos 2 caracteres."
            }
    },

    valor: {
        required:
            "O valor é orbigatório.",

            valueAsNumber:{
                    value:0,
                    message:

                        "O valor não pode ser negativo."
            }
    },

    data_de_criacao: {
        required:
            "A data de criação é obrigatória."
    },

    autor_id: {
        required:
            "Seecione um autor",

        setValueAs: (value) =>
            value === ""
                ? undefined
                : Number(value)
    }
}


/*

Function para cadastrar livros pelo modal

*/
function CadastroLivro({
    aberto,
    onFechar,
    onAdicionar
}) {
    const [autores, setAutores] = useState([]);



    const {
        register,
        handleSubmit,
        reset,
        setError,
        control,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        defaultValues: LivroInicial,
        shouldUnregister: true
    });

    const anonimo = useWatch({
        control,
        name: "anonimo",
    });

    useEffect(() => {

        if (!aberto) {
            return;
        }

        async function carregarAutores() {
            try {

                const dados = await getAutores();
                setAutores(dados)

            } catch (error) {
                setError("root.servidor", {
                    type: "server",
                    message: error.message
                });
            }
        }

        carregarAutores();
    }, [aberto, setError]);

    if (!aberto) {
        return null;
    }

    function fecharModal() {
        reset();
        onFechar();
    }

    async function adicionarLivro(dados) {
        try {
            await onAdicionar(dados);

            reset();
            onFechar();
        } catch (error) {
            setError("root.servidor", {
                type: "server",
                message:
                    error.message ||
                    "Não foi possível adicionar o livro."
            });
        }
    }

    return (
        <div className="overlay">
            <div className="modal modal-adicionar">

                <div className="cabecalho-modal">
                    <div>
                        <h2>Adicionar livro</h2>
                    </div>

                    <button
                        type="button"
                        className="botao-fechar"
                        onClick={fecharModal}
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(adicionarLivro)}
                >
                    <div className="campo-formulario">
                        <label>Título</label>

                        <input
                            type="text"
                            {...register(
                                "titulo",
                                validacoes.titulo
                            )}
                        />

                        <ErroCampo erro={
                            errors.titulo
                        } />
                    </div>

                    <div className="campo-formulario">
                        <label>Número de páginas</label>

                        <input
                            type="number"
                            {...register(
                                "n_paginas",
                                validacoes.n_paginas
                            )}
                        />

                        <ErroCampo erro={
                            errors.n_paginas
                        } />
                    </div>

                    <div className="campo-formulario">
                        <label>Gênero</label>

                        <input
                            type="text"
                            {...register(
                                "genero",
                                validacoes.genero
                            )}
                        />

                        <ErroCampo erro={
                            errors.genero
                        } />
                    </div>

                    <div className="campo-formulario">
                        <label>Valor</label>

                        <input
                            type="number"
                            {...register(
                                "valor",
                                validacoes.valor
                            )}
                        />

                        <ErroCampo erro={
                            errors.valor
                        } />
                    </div>

                    <div className="campo-formulario">
                        <label>Data de criação</label>

                        <input
                            type="date"
                            {...register(
                                "data_de_criacao",
                                validacoes.data_de_criacao
                            )}
                        />

                        <ErroCampo erro={
                            errors.data_de_criacao
                        } />
                    </div>

                    <div className="campo-formulario">
                        <label>
                            <input
                                type="checkbox"
                                {...register("anonimo")}
                            />

                            Autor anônimo
                        </label>
                    </div>

                    {!anonimo && (
                        <div className="campo-formulario">

                            <label>Autor</label>

                            <select
                                {...register(
                                    "autor_id",
                                    validacoes.autor_id
                                )}
                            >
                                <option value="">
                                    Selecione um autor
                                </option>

                                {autores.map((autor) => (
                                    <option
                                        key={autor.id}
                                        value={autor.id}
                                    >
                                        {autor.nome}
                                    </option>
                                ))}
                            </select>

                            <ErroCampo erro={
                                errors.autor_id
                        } />
                        </div>
                    )}

                    {errors.root?.servidor && (
                        <div className="erro">
                            <p>
                                {
                                    errors.root.servidor
                                        .message
                                }
                            </p>
                        </div>
                    )}

                    <div className="acoes-formulario">
                        <button
                            type="button"
                            className="botao-cancelar"
                            onClick={fecharModal}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="botao-salvar"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Adicionando..."
                                : "Adicionar livro"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CadastroLivro;