import prismadb from "@/lib/prismadb"
import { exercicioFormSchema } from "@/lib/zodSchemas"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    request: Request,
    { params }: { params: { exercicioId: string } }
) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await request.json()
        const date = exercicioFormSchema.parse(body)

        const exercicio = await prismadb.exercicio.update({
            where: {
                id: BigInt(params.exercicioId),
                userId: userId
            },
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
        console.log('[EXERCICIO_PATCH]', err)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { exercicioId: string } }
) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        await prismadb.exercicio.delete({
            where: {
                id: BigInt(params.exercicioId),
                userId: userId
            }
        })
        return NextResponse.json('', { status: 202 })
    } catch (err) {
        console.log('[EXERCICIO_DELETE]', err)
        return new NextResponse("Internal error", { status: 500 })
    }

}