import prismadb from "@/lib/prismadb"
import { configLogicZod } from "@/lib/zodSchemas"
import { OptConfigLogic, ScoreReturn, Serie, configLogic } from "@/types"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const { userId, sessionClaims } = auth()
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
    // preciso retornar as labels, e the date

    // labels dos dias do mês
    // eu posso fazer labels no frontend

    // então eu vou criar um aray com o dia e com o score

    let configList: configLogic[] = []
    const result = configLogicZod.safeParse(sessionClaims.configList)
    if (result.success) configList = result.data
    const optConfigList: OptConfigLogic[] = configList.map((conf) => ({
        a: parseInt(conf.a),
        de: parseInt(conf.de),
        importancia: parseFloat(conf.importancia) / 100
    }))

    const calculaPeso = (reps: number) => {
        if (optConfigList.length == 0) return reps
        let repNumber = 0
        for (let i = 0; i < optConfigList.length - 1; i++) {
            if (reps > optConfigList[i].a) {
                repNumber += (optConfigList[i].a - optConfigList[i].de) * optConfigList[i].importancia
            } else {
                repNumber += (reps - optConfigList[i].de) * optConfigList[i].importancia
                return repNumber
            }
        }
        return repNumber + (optConfigList[optConfigList.length - 1].de - reps) * optConfigList[optConfigList.length - 1].importancia
    }

    const ret: ScoreReturn[] = []
    response.forEach((element) => {
        const month = element.createdAt.getMonth() + 1
        const dia = element.createdAt.getDate()
        const label = `${month}/${dia}`
        const series = JSON.parse(element.series) as Serie[]
        const data = series.reduce((prev, serie) => prev + (serie.carga * calculaPeso(serie.reps)), 0)

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