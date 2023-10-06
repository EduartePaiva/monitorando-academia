import { Button } from "@/components/ui/button"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import Image from 'next/image'
import EditarExcluir from "./EditarExcluir"


async function getExercicio(exercicioId: string) {
    try {
        const { userId } = auth()
        if (!userId) return null

        const exercicio = prismadb.exercicio.findFirst({
            where: {
                id: BigInt(exercicioId),
                userId: userId
            }
        })

        return exercicio
    } catch (err) {
        console.log('[GET_EXERCICIO_ERRO]', err)
        return null
    }
}



export default async function page({ params }: { params: { exercicioId: string } }) {

    try {
        const exercicio = await getExercicio(params.exercicioId)
        if (!exercicio) return (<div>Id do exercício inválido</div>)

        return (
            <div className="container mb-16">
                <div className="flex flex-col justify-center items-center gap-10">
                    <span className="font-semibold text-2xl text-gray-500 drop-shadow-md">{exercicio.nome}</span>

                    {exercicio.imagem_url &&
                        <Image
                            src={exercicio.imagem_url}
                            alt="Imagem"
                            width={500}
                            height={500}
                        />

                    }
                    <span className=" text-gray-500 drop-shadow-md">{exercicio.descricao}</span>


                    <EditarExcluir exercicio={exercicio} />
                </div>
            </div>
        )
    } catch (err) {
        return (<div>Id do exercício inválido ou problema na conexão</div>)
    }

}