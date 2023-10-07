import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NovaCategoria from "./NovaCategoria";
import CategoriaCard from "./CategoriaCard";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export default async function CategoriasPage() {

    const { userId } = auth()
    if (!userId) return <div>Não está logado</div>

    const categorias = await prismadb.categoria.findMany({
        where: {
            userId
        }
    })


    return (
        <div className="container h-full">
            <div className="flex flex-col h-full">
                <NovaCategoria className="self-end absolute" />
                <div className="h-full flex items-center flex-col gap-16 justify-center">

                    {categorias.map((categoria, index) => (
                        <CategoriaCard key={index} descricao={categoria.descricao} titulo={categoria.nome} />
                    ))}
                </div>
            </div>
        </div>
    )
}
