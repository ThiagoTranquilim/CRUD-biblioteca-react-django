import { useForm } from "react-hook-form";

const AutorInicial = {
    nome: "",
    idade: "",
    genero_favorito: ""
};

function AdicionarAutorModal({
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
        defaultValues: AutorInicial
    });

    if (!aberto) {
        return null;
    }

    function fecharModal() {
        reset();
        onFechar();
    }

    async function adicionarAutor(dados) {
        try {
            await onAdicionar(dados);

            reset();

            onFechar();
        } catch (error) {
            setError("root.servidor", {
                type: "server",
                message:
                    error.message ||
                    "Não foi possível adicionar o autor."
            });
        }
    }

    return (
        <div className="overlay">
            <div className="modal modal-adicionar">

                <div className="cabecalho-modal">
                    <div>
                        <h2>Adicionar autor</h2>
                    </div>

                    <button
                        type="button"
                        className="botao-fechar"
                        onClick={fecharModal}
                    >
                        x
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit(adicionarAutor)}
                >
                    <div className="campo-formulario">
                        <label>
                            Nome
                        </label>

                        <input
                            type="text"
                            placeholder="Digite o nome do autor"

                            {...register("nome", {
                                required:
                                    "O nome é obrigatório",

                                minLength: {
                                    value: 2,
                                    message:
                                        "O nome deve possuir pelo menos 2 caracteres"
                                }
                            })}
                        />

                        {errors.nome && (
                            <div className="erro">
                                <p>
                                    {errors.nome.message}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="campo-formulario">
                        <label>
                            Idade
                        </label>

                        <input
                            type="number"
                            placeholder="Digite a idade do autor"

                            {...register("idade", {
                                required:
                                    "A idade é obrigatória",

                                valueAsNumber: true,

                                min: {
                                    value: 1,
                                    message:
                                        "A idade deve ser maior que 0"
                                },

                                max: {
                                    value: 150,
                                    message:
                                        "Informe uma idade válida"
                                }
                            })}
                        />

                        {errors.idade && (
                            <div className="erro">
                                <p>
                                    {errors.idade.message}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="campo-formulario">
                        <label>
                            Gênero favorito
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: Fantasia"

                            {...register(
                                "genero_favorito",
                                {
                                    required:
                                        "O gênero favorito é obrigatório"
                                }
                            )}
                        />

                        {errors.genero_favorito && (
                            <div className="erro">
                                <p>
                                    {
                                        errors
                                            .genero_favorito
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
                                : "Adicionar autor"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdicionarAutorModal;