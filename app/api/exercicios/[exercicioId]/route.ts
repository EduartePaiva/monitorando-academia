import prismadb from "@/lib/prismadb"
import { exercicioFormSchema } from "@/lib/zodSchemas"
import { SafeExercicio } from "@/types"
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

        const categoriaId = (date.categoriaId === undefined) ? null : BigInt(date.categoriaId)

        const exercicio = await prismadb.exercicio.update({
            where: {
                id: BigInt(params.exercicioId),
                userId: userId
            },
            data: {
                userId,
                descricao: date.descricao,
                dia_da_semana: typeof (date.dia_da_semana) === 'number' ? date.dia_da_semana : parseInt(date.dia_da_semana),
                nome: date.nome,
                imagem_url: date.imageUrl,
                categoriaId
            },
            select: {
                categoriaId: true,
                descricao: true,
                dia_da_semana: true,
                id: true,
                imagem_url: true,
                nome: true
            }
        })

        const exercicioSafe: SafeExercicio = {
            ...exercicio,
            id: exercicio.id.toString(),
            categoriaId: exercicio.categoriaId?.toString(),
        }

        return NextResponse.json(exercicioSafe, { status: 200 })
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