import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { useAutores } from "../../hooks/useAutores";

import FiltrosAutores from "../../../components/autores/FiltrosAutores";
import OrdenacaoAutores from "../../../components/autores/OrdenacaoAutores";
import ListaAutores from "../../../components/autores/ListaAutores";
import AutorDetalhesModal from "../../../components/autores/AutorDetalhesModel";
import AdicionarAutorModal from "../../../components/autores/AdicionarAutorModal";


const FiltrosIniciais = {
    pesquisa: "",
    genero_favorito: "",
    campoOrdenacao: "nome",
    direcaoOrdenacao: "asc"
};


function Autores() {

    const {
        autores,
        loading,
        erro,
        adicionarAutor,
        excluirAutor
    } = useAutores();

    const [
        autorSelecionado,
        setAutorSelecionado
    ] = useState(null);


    const [
        modalAdicionar,
        setModalAdicionar
    ] = useState(false);

    const {
        register,
        watch,
        setValue,
        reset
    } = useForm({
        defaultValues: FiltrosIniciais
    });
    const pesquisa =
        watch("pesquisa");

    const genero_favorito =
        watch("genero_favorito");

    const campoOrdenacao =
        watch("campoOrdenacao");

    const direcaoOrdenacao =
        watch("direcaoOrdenacao");

    const autoresFiltradosOrdenados = useMemo(() => {

        const filtrados = autores.filter((autor) => {

            const nomeAutor =
                autor.nome?.toLowerCase() ?? "";

            const generoAutor =
                autor.genero_favorito?.toLowerCase() ?? "";


            const pesquisaNormalizada =
                pesquisa.trim().toLowerCase();

            const generoNormalizado =
                genero_favorito.trim().toLowerCase();


            const correspondePesquisa =
                nomeAutor.includes(
                    pesquisaNormalizada
                );


            const correspondeGenero =
                generoAutor.includes(
                    generoNormalizado
                );


            return (
                correspondePesquisa &&
                correspondeGenero
            );
        });

        const ordenados = [...filtrados];


        ordenados.sort((autorA, autorB) => {

            let resultado;

            if (campoOrdenacao === "idade") {

                resultado =
                    Number(autorA.idade) -
                    Number(autorB.idade);

            } else {

                resultado =
                    autorA.nome.localeCompare(
                        autorB.nome
                    );
            }

            if (direcaoOrdenacao === "desc") {
                return -resultado;
            }


            return resultado;
        });


        return ordenados;

    }, [
        autores,
        pesquisa,
        genero_favorito,
        campoOrdenacao,
        direcaoOrdenacao
    ]);

    async function handleExcluirAutor() {

        if (!autorSelecionado) {
            return;
        }


        try {

            await excluirAutor(
                autorSelecionado.id
            );


            setAutorSelecionado(null);

        } catch (error) {

            console.error(
                "Erro ao excluir autor:",
                error
            );
        }
    }

    function limparFiltros() {

        reset(FiltrosIniciais);
    }


    return (

        <main className="pagina-autores">

            <header className="cabecalho">

                <div>

                    <h1>
                        Autores
                    </h1>

                    <p>
                        Consulte os autores
                        cadastrados no sistema.
                    </p>

                </div>


                <button
                    type="button"
                    className="botao-adicionar"
                    onClick={() =>
                        setModalAdicionar(true)
                    }
                >
                    + Adicionar Autor
                </button>

            </header>


            <FiltrosAutores
                register={register}
                onLimpar={limparFiltros}
            />


            <OrdenacaoAutores
                campoOrdenacao={
                    campoOrdenacao
                }
                direcaoOrdenacao={
                    direcaoOrdenacao
                }
                setValue={
                    setValue
                }
            />


            <ListaAutores
                autores={
                    autoresFiltradosOrdenados
}
                totalAutores={
                    autores.length
                }
                loading={
                    loading
                }
                erro={
                    erro
                }
                onSelecionar={
                    setAutorSelecionado
                }
            />

            <AutorDetalhesModal
                autor={
                    autorSelecionado
                }
                onFechar={() =>
                    setAutorSelecionado(null)
                }
                onExcluir={
                    handleExcluirAutor
                }
            />

            <AdicionarAutorModal
                aberto={
                    modalAdicionar
                }
                onFechar={() =>
                    setModalAdicionar(false)
                }
                onAdicionar={
                    adicionarAutor
                }
            />
        </main>
    );
}

export default Autores;