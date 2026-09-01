import { useMemo, useState } from "react";

import { useLivros } from "../../hooks/useLivros";

import FiltrosLivros from "../../../components/livros/FiltrosLivros";
import OrdenacaoLivros from "../../../components/livros/OrdenacaoLivros";
import ListaLivros from "../../../components/livros/ListaLivros";
import LivroDetalhesModal from "../../../components/livros/LivroDetalhesModel";
import AdicionarLivroModal from "../../../components/livros/AdicionarLivroModal";

function Livros() {

    const {
        livros,
        loading,
        erro,
        adicionarLivro,
        excluirLivro,
    } = useLivros();

    // Filtros
    const [pesquisa, setPesquisa] = useState("");

    const [autor, setAutor] = useState("");

    const [genero, setGenero] = useState("");

    // Ordenação
    const [campoOrdenacao, setCampoOrdenacao] = useState("titulo");

    const [
        direcaoOrdenacao,
        setDirecaoOrdenacao
    ] = useState("asc");

    // Modal de detalhes
    const [livroSelecionado, setLivroSelecionado] = useState(null);

    // Modal adicionar

    const [modalAdicionar, setModalAdicionar] = useState(false);

    const livrosFiltrados = useMemo(() => {
        return livros.filter((livro) => {
            const titulo = livro.titulo || "";

            const nomeAutor = livro.autor_nome || "";

            const generoLivro = livro.genero || "";

            const correspondeTitulo = titulo.toLowerCase().includes(pesquisa.toLowerCase());

            const correspondeAutor =
                nomeAutor
                    .toLowerCase()
                    .includes(
                        autor.toLowerCase()
                    );

            const correspondeGenero =
                generoLivro
                    .toLowerCase()
                    .includes(
                        genero.toLowerCase()
                    );

            return (
                correspondeTitulo &&
                correspondeAutor &&
                correspondeGenero
            );
        });
    }, [
        livros,
        pesquisa,
        autor,
        genero
    ]);

    const livrosOrdenados = useMemo(() => {
        return [...livrosFiltrados].sort(
            (a, b) => {
                let comparacao = 0;

                if (
                    campoOrdenacao === "titulo"
                ) {
                    comparacao =
                        (a.titulo || "")
                            .localeCompare(
                                b.titulo || ""
                            );
                }

                if (
                    campoOrdenacao === "valor"
                ) {
                    comparacao =
                        Number(a.valor) -
                        Number(b.valor);
                }

                if (
                    campoOrdenacao ===
                    "data_de_criacao"
                ) {
                    comparacao =
                        new Date(
                            a.data_de_criacao
                        ) -
                        new Date(
                            b.data_de_criacao
                        );
                }

                if (
                    direcaoOrdenacao === "desc"
                ) {
                    return -comparacao;
                }

                return comparacao;
            }
        );
    }, [
        livrosFiltrados,
        campoOrdenacao,
        direcaoOrdenacao
    ]);

    return (
        <main className="pagina-livros">
            <header className="cabecalho">
                <div>
                    <h1>Meus livros</h1>

                    <p>
                        Consulte os livros
                        cadastrados no sistema.
                    </p>
                </div>

                <button
                    className="botao-adicionar"
                    onClick={() =>
                        setModalAdicionar(true)
                    }
                >
                    + Adicionar Livro
                </button>
            </header>

            <FiltrosLivros
                pesquisa={pesquisa}
                setPesquisa={setPesquisa}
                autor={autor}
                setAutor={setAutor}
                genero={genero}
                setGenero={setGenero}
            />

            <OrdenacaoLivros
                campoOrdenacao={
                    campoOrdenacao
                }
                setCampoOrdenacao={
                    setCampoOrdenacao
                }
                direcaoOrdenacao={
                    direcaoOrdenacao
                }
                setDirecaoOrdenacao={
                    setDirecaoOrdenacao
                }
            />

            <ListaLivros
                livros={livrosOrdenados}
                totalLivros={livros.length}
                loading={loading}
                erro={erro}
                onSelecionar={
                    setLivroSelecionado
                }
            />

            <LivroDetalhesModal
                livro={livroSelecionado}
                onFechar={() =>
                    setLivroSelecionado(null)
                }
                onExcluir={() => {

                    excluirLivro(livroSelecionado.id);
                    setLivroSelecionado(null);
                }}
            />

            <AdicionarLivroModal
                aberto={modalAdicionar}
                onFechar={() =>
                    setModalAdicionar(false)
                }
                onAdicionar={
                    adicionarLivro
                }
                onExcluir={
                    excluirLivro
                }
            />
        </main>
    );
}

export default Livros;