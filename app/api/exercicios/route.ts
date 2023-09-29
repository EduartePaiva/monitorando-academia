import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { exercicioFormSchema } from "@/lib/zodSchemas"
import prismadb from "@/lib/prismadb"

export async function POST(request: Request) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await request.json()
        const date = exercicioFormSchema.parse(body)

        const exercicio = await prismadb.exercicio.create({
            data: {
                userId,
                descricao: date.descricao,
                dia_da_semana: parseInt(date.dia_da_semana),
                nome: date.nome,
                imagem_url: date.imageUrl
            }
        })

        return NextResponse.json({
            ...exercicio,
            id: exercicio.id.toString()
        })

    } catch (err) {
        console.log('[EXERCICIOS_POST]', err)
        return new NextResponse("Internal error", { status: 500 })

    }
}