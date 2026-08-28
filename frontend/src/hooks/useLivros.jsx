import { useCallback, useEffect, useState } from "react";
import { getLivros, postLivros, deleteLivro } from "../services/api";

export function useLivros() {

    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const carregarLivros = useCallback(async () => {
        try {
            setLoading(true);
            setErro(null);

            const dados = await getLivros();

            setLivros(dados);
        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    async function adicionarLivro(novoLivro) {
        try {
            setErro(null);

            await postLivros(novoLivro);

            await carregarLivros();
        } catch (error) {
            setErro(error.message);
            throw error;
        }
    }

        async function excluirLivro(id) {
        try {
            setErro(null);

            await deleteLivro(id);

            await carregarLivros();
        } catch (error) {
            setErro(error.message);
            throw error;
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(carregarLivros, 0);

        return () => clearTimeout(timeoutId);
    }, [carregarLivros]);

    return {
        livros,
        loading,
        erro,
        carregarLivros,
        adicionarLivro,
        excluirLivro,
    };
}