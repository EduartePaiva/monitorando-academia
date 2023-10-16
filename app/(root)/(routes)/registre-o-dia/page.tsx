import prismadb from "@/lib/prismadb";
import RegistreDiaPage from "./RegistreDiaPage";
import { auth } from "@clerk/nextjs";



export default async function PaginaInicial() {
    try {
        const { userId } = auth()

        if (userId === null) return <span>Não autorizado.</span>


        const exerciciosPrisma = await prismadb.exercicio.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                nome: true,
                categoriaId: true,
                dia_da_semana: true,
            }
        })

        const exerciciosSafe = exerciciosPrisma.map((exercicio) => ({
            ...exercicio,
            id: exercicio.id.toString(),
            categoriaId: exercicio.categoriaId?.toString()
        }))

        const categoriasPrisma = await prismadb.categoria.findMany({
            where: {
                userId
            },
            select: {
                nome: true,
                id: true
            }
        })

        const categoriasSafe = categoriasPrisma.map((categoria) => ({
            ...categoria,
            id: categoria.id.toString()
        }))

        return (
            <>
                <RegistreDiaPage categorias={categoriasSafe} exercicios={exerciciosSafe} />
            </>
        )
    } catch (err) {
        return <span>Erro no banco de dados, tente recarregar a página</span>
    }



}