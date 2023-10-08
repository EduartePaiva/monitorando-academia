import { SafeCategoria } from './../../../../types/index.d'
import prismadb from "@/lib/prismadb"
import { categoriaFormSchema, exercicioFormSchema } from "@/lib/zodSchemas"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
    request: Request,
    { params }: { params: { categoriaId: string } }
) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await request.json()
        const date = categoriaFormSchema.parse(body)

        const categoria = await prismadb.categoria.update({
            where: {
                id: BigInt(params.categoriaId),
                userId: userId
            },
            data: {
                userId,
                descricao: date.descricao,
                nome: date.nome,
            },
            select: {
                id: true,
                nome: true,
                descricao: true
            }
        })

        const categoriaSafe: SafeCategoria = {
            ...categoria,
            id: categoria.id.toString()
        }
        return NextResponse.json(categoriaSafe, { status: 200 })
    } catch (err) {
        console.log('[CATEGORIA_PATCH]', err)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { categoriaId: string } }
) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        await prismadb.categoria.delete({
            where: {
                id: BigInt(params.categoriaId),
                userId: userId
            }
        })
        return NextResponse.json('', { status: 202 })
    } catch (err) {
        console.log('[CATEGORIA_DELETE]', err)
        return new NextResponse("Internal error", { status: 500 })
    }

}