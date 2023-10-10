import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { exercicioFormSchema } from "@/lib/zodSchemas"
import prismadb from "@/lib/prismadb"
import { SafeExercicio } from "@/types"


//retorna todos os exercícios
export async function GET(request: Request) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

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

        return NextResponse.json(exerciciosSafe)

    } catch (err) {
        console.log('[EXERCICIOS_GET]', err)
        return new NextResponse("Internal error", { status: 500 })
    }
}


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
                dia_da_semana: typeof (date.dia_da_semana) === 'number' ? date.dia_da_semana : parseInt(date.dia_da_semana),
                nome: date.nome,
                imagem_url: date.imageUrl
            },
            select: {
                id: true,
                categoriaId: true,
                imagem_url: true,
                nome: true,
                dia_da_semana: true,
                descricao: true
            }
        })

        return NextResponse.json({
            ...exercicio,
            id: exercicio.id.toString(),
            categoriaId: exercicio.categoriaId?.toString()
        })

    } catch (err) {
        console.log('[EXERCICIOS_POST]', err)
        return new NextResponse("Internal error", { status: 500 })

    }
}