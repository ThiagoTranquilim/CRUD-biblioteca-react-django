function FiltrosAutores({
    register,
}) {

    return (

        <section className="filtros">

            <div className="campo-pesquisa">

                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    {...register("pesquisa")}
                />

            </div>


            <div className="controles">

                <div className="campo">

                    <label>
                        Gênero favorito
                    </label>

                    <input
                        type="text"
                        placeholder="Ex: Romance"
                        {...register(
                            "genero_favorito"
                        )}
                    />

                </div>

            </div>

        </section>
    );
}


export default FiltrosAutores;