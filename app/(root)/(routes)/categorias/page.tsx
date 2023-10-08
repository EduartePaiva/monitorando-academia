import NovaCategoria from "./NovaCategoria";
import CategoriaCard from "./CategoriaCard";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import ExibirCategorias from "./ExibirCategorias";
import { SafeCategoria } from "@/types";

export default async function CategoriasPage() {

    const { userId } = auth()
    if (!userId) return <div>Não está logado</div>

    const categorias = await prismadb.categoria.findMany({
        where: {
            userId
        }
    })
    const safeCategorias: SafeCategoria[] = categorias.map((categoria) => ({
        descricao: categoria.descricao,
        id: categoria.id.toString(),
        nome: categoria.nome
    }))

    return (
        <div className="container h-full">
            <div className="flex flex-col h-full">
                <NovaCategoria className="self-end absolute" />
                {safeCategorias.length > 1 ? (
                    <ExibirCategorias initialCategorias={safeCategorias} />
                ) : (
                    <span className="text-lg font-semibold">Não há categoria adicionada, clique em "Nova Categoria" para adicionar uma.</span>
                )}
            </div>
        </div>
    )
}
