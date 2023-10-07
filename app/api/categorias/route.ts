import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { categoriaFormSchema, exercicioFormSchema } from "@/lib/zodSchemas"
import prismadb from "@/lib/prismadb"


//retorna todos as categorias do usuário
export async function GET() {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const categorias = await prismadb.categoria.findMany({
            where: {
                userId
            },
            select: {
                id: true,
                nome: true,
                descricao: true
            }
        })
        console.log("CATEGORIAS_GET")
        return NextResponse.json(categorias.map((categoria) => (
            {
                ...categoria,
                id: categoria.id.toString(),
            }
        )))

    } catch (err) {
        console.log('[CATEGORIAS_GET]', err)
        return new NextResponse("Internal error", { status: 500 })
    }
}


export async function POST(request: Request) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await request.json()
        const date = categoriaFormSchema.parse(body)

        const categoria = await prismadb.categoria.create({
            data: {
                userId,
                descricao: date.descricao,
                nome: date.nome
            },
            select: {
                id: true,
                nome: true,
                descricao: true
            }
        })

        return NextResponse.json({
            ...categoria,
            id: categoria.id.toString(),
        })

    } catch (err) {
        console.log('[CATEGORIA_POST]', err)
        return new NextResponse("Internal error", { status: 500 })

    }
}