import { SafeExercicio } from "@/types";
import { ComboboxExercicios } from "./ComboboxExercicios";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { ComboboxExercicios2 } from "./ComboboxExercicios2";

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


export default async function CategoryIdPage({ params }: { params: { categoriaId: string } }) {
    const exercicios = await getExercicios()



    return (
        <div className="container">
            <div className="flex justify-around">
                <div>
                    <span>Exercícios</span>
                </div>
                <div className="flex flex-col gap-3">
                    <span>Adicionar o Exercício</span>
                    {exercicios &&
                        <div>
                            <ComboboxExercicios exercicios={exercicios} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}