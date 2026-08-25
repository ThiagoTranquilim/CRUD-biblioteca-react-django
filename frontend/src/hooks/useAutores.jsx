import { useCallback, useEffect, useState } from "react";
import { getAutores, postAutores, deleteAutor } from "../services/api";

export function useAutores() {
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const carregarAutores = useCallback(async () =>{
        try {
            setLoading(true);
            setErro(null);

        const dados = await getAutores();

        setAutores(dados);
        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    async function adicionarAutor(novoAutor) {
        try{
            setErro(null);

            await postAutores(novoAutor);

            await carregarAutores();
        }catch (error) {
            setErro(error.message);
            throw error;
        }
    }

    async function excluirAutor(id) {
        try {
            setErro(null);

            await deleteAutor(id);

            await carregarAutores();
        } catch (error) {
            setErro(error.message);
            throw error;
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(carregarAutores, 0);

        return () => clearTimeout(timeoutId);
    }, [carregarAutores]);

    return {
        autores,
        loading,
        erro,
        carregarAutores,
        adicionarAutor,
        excluirAutor,
    };
}