import prismadb from "@/lib/prismadb"
import { regDiaFormSchema } from "@/lib/zodSchemas"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await request.json()
        const date = regDiaFormSchema.parse({
            ...body,
            data: body.data ? new Date(body.data) : undefined
        })

        //aqui eu vou ver se o json do series está em formato de string ou não

        const registreDia = await prismadb.registreDia.create({
            data: {
                userId,
                numeroDeSeries: date.numeroDeSeries,
                series: date.series,
                exercicioId: BigInt(date.exercicioId),
                createdAt: date.data
            },
            select: {
                id: true,
                numeroDeSeries: true,
                series: true,
                exercicioId: true
            }
        })

        return NextResponse.json({
            ...registreDia,
            id: registreDia.id.toString(),
            exercicioId: registreDia.exercicioId.toString()
        }, { status: 200 })

    } catch (err) {
        console.log('[REGISTREODIA_POST]', err)
        return new NextResponse("Internal error", { status: 500 })

    }

}