import { SafeCategoria, SafeCategoriaComExercicios, SafeExercicio } from "@/types";
import { ComboboxExercicios } from "./ComboboxExercicios";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import SistemaDeCategorias from "./SistemaDeCategorias";

async function getExercicios() {
    try {
        const { userId } = auth()
        if (!userId) return false

        const exercicios = await prismadb.exercicio.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                categoriaId: true,
                imagem_url: true,
                nome: true,
                dia_da_semana: true,
                descricao: true
            },
            orderBy: {
                categoriaId: {
                    sort: 'asc',
                    nulls: "first"
                }
            }
        })

        const exerciciosSafe: SafeExercicio[] = exercicios.map((exercicio) => (
            {
                ...exercicio,
                id: exercicio.id.toString(),
                categoriaId: exercicio.categoriaId?.toString()
            }
        ))

        return exerciciosSafe
    } catch (err) {
        console.log("Erro categoriaId parge: ", err)
        return false
    }
}

async function getCurrentCategory(categoryId: string) {
    try {
        const { userId } = auth()
        if (!userId) return false

        const categoria = await prismadb.categoria.findFirst({
            where: {
                id: BigInt(categoryId),
                userId,
            },
            select: {
                descricao: true,
                id: true,
                nome: true,
                exercicios: {
                    where: {
                        categoriaId: BigInt(categoryId)
                    },
                    select: {
                        id: true,
                        nome: true
                    }

                }
            }
        })

        if (categoria === null) return false

        console.log("CATEGORIA_GET")
        const categoriaSafe: SafeCategoriaComExercicios = {
            ...categoria,
            id: categoria.id.toString(),
            exercicios: categoria.exercicios.map((exercicio) => ({
                id: exercicio.id.toString(),
                nome: exercicio.nome
            }))

        }
        return categoriaSafe


    } catch (err) {
        console.log('[CATEGORIA_GET]', err)
        return false
    }
}


export default async function CategoryIdPage({ params }: { params: { categoriaId: string } }) {
    const exercicios = await getExercicios()
    const currentCategoria = await getCurrentCategory(params.categoriaId)


    if (exercicios && currentCategoria) {
        return <SistemaDeCategorias exercicios={exercicios} currentCategoria={currentCategoria} />
    } else {
        return <div>Problema com o banco de dados</div>
    }
}