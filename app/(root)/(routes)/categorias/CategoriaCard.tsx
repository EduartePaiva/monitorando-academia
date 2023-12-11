'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SafeCategoria } from "@/types";
import { useRouter } from "next/navigation";

interface CategoriaCardProps {
    categoria: SafeCategoria
}

export default function CategoriaCard({
    categoria
}: CategoriaCardProps) {
    const router = useRouter()

    return (
        <Card
            className=" w-full cursor-pointer transition ease-in-out hover:scale-110 hover:shadow-lg"
            onClick={() => {
                router.push(`/categorias/${categoria.id}`)
            }}
        >
            <CardHeader className="items-center">
                <CardTitle>{categoria.nome}</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center gap-2">
                <CardDescription className="text-md">{categoria.descricao}</CardDescription>
            </CardContent>
        </Card>

    )
}