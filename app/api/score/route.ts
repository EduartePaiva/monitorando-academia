import prismadb from "@/lib/prismadb"
import { ScoreReturn, Serie } from "@/types"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    // último mês, ultimos 3 meses, ultimo ano, personalizado
    // 30 dias representa em dias,
    // 3 mêses representa em semanas
    // 1 ano representa em mêses
    // personalizado eu vou calcular a qtd de dias e representar de acordo

    let categoriaId: undefined | bigint = undefined
    let exercicioId: undefined | bigint = undefined
    if (searchParams.has("exercicioId")) {
        const exercicio = searchParams.get("exercicioId") ?? undefined
        exercicioId = typeof exercicio == 'string' ? BigInt(exercicio) : undefined
    } else if (searchParams.has("categoriaId")) {
        const categoria = searchParams.get("categoriaId") ?? undefined
        categoriaId = typeof categoria == 'string' ? BigInt(categoria) : undefined
    }


    // vamos testar 1 mês
    const lastData = new Date()
    lastData.setDate(lastData.getDate() - 30)

    const response = await prismadb.registreDia.findMany({
        where: {
            userId,
            createdAt: {
                lte: new Date(),
                gte: lastData
            },
            exercicioId,
            exercicio: {
                categoriaId
            }
        },
        select: {
            series: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "asc"
        }

    })
    console.log(response)
    // preciso retornar as labels, e the date

    // labels dos dias do mês
    // eu posso fazer labels no frontend

    // então eu vou criar um aray com o dia e com o score
    const ret: ScoreReturn[] = []


    response.forEach((element) => {
        const month = element.createdAt.getMonth() + 1
        const dia = element.createdAt.getDate()
        const label = `${month}/${dia}`

        const series = JSON.parse(element.series) as Serie[]
        const data = series.reduce((prev, serie) => {
            return prev += (serie.carga * serie.reps)
        }, 0)

        if (ret.length > 0 && ret[ret.length - 1].label == label) {
            ret[ret.length - 1].data += data
        } else {
            ret.push({
                label,
                data
            })
        }
    })
    return NextResponse.json(ret, { status: 200 })
}