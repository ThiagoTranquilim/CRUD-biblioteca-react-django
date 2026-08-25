import { useForm } from "react-hook-form";

const LivroInicial = {
    titulo: "",
    n_paginas: "",
    genero: "",
    valor: "",
    data_de_criacao: ""
};

function AdicionarLivroModal({
    aberto,
    onFechar,
    onAdicionar
}) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        defaultValues: LivroInicial
    });

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
                        <label>
                            Título
                        </label>

                        <input
                            type="text"
                            placeholder="Digite o título do livro"
                            {...register("titulo", {
                                required:
                                    "O título é obrigatório",

                                minLength: {
                                    value: 2,
                                    message:
                                        "O título deve possuir pelo menos 2 caracteres"
                                }
                            })}
                        />

                        {errors.titulo && (
                            <div className="erro">
                                <p>
                                    {errors.titulo.message}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="campo-formulario">
                        <label>
                            Número de páginas
                        </label>

                        <input
                            type="number"
                            placeholder="Digite o número de páginas"
                            {...register("n_paginas", {
                                required:
                                    "O número de páginas é obrigatório",

                                valueAsNumber: true,

                                min: {
                                    value: 1,
                                    message:
                                        "O número de páginas deve ser maior que 0"
                                }
                            })}
                        />

                        {errors.n_paginas && (
                            <div className="erro">
                                <p>
                                    {errors.n_paginas.message}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="campo-formulario">
                        <label>
                            Gênero
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: Fantasia"
                            {...register("genero", {
                                required:
                                    "O gênero é obrigatório",

                                minLength: {
                                    value: 2,
                                    message:
                                        "O gênero deve possuir pelo menos 2 caracteres"
                                }
                            })}
                        />

                        {errors.genero && (
                            <div className="erro">
                                <p>
                                    {errors.genero.message}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="campo-formulario">
                        <label>
                            Valor
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            placeholder="Ex: 49.90"
                            {...register("valor", {
                                required:
                                    "O valor é obrigatório",

                                valueAsNumber: true,

                                min: {
                                    value: 0,
                                    message:
                                        "O valor não pode ser negativo"
                                }
                            })}
                        />

                        {errors.valor && (
                            <div className="erro">
                                <p>
                                    {errors.valor.message}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="campo-formulario">
                        <label>
                            Data de criação
                        </label>

                        <input
                            type="date"
                            {...register(
                                "data_de_criacao",
                                {
                                    required:
                                        "A data de criação é obrigatória"
                                }
                            )}
                        />

                        {errors.data_de_criacao && (
                            <div className="erro">
                                <p>
                                    {
                                        errors
                                            .data_de_criacao
                                            .message
                                    }
                                </p>
                            </div>
                        )}
                    </div>

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

export default AdicionarLivroModal;