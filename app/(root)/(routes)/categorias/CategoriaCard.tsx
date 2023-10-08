'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SafeCategoria } from "@/types";
import { PenSquare, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoriaCardProps {
    categoria: SafeCategoria
    editButton: (categoriaId: SafeCategoria) => void
    deleteButton: (categoriaId: SafeCategoria) => void
}

export default function CategoriaCard({
    categoria,
    editButton,
    deleteButton
}: CategoriaCardProps) {
    const router = useRouter()

    return (
        <Card
            className="w-1/3 cursor-pointer transition ease-in-out hover:scale-110 hover:shadow-lg"
            onClick={() => {
                router.push(`/categorias/${categoria.id}`)
            }}
        >
            <CardHeader className="items-center">
                <CardTitle>{categoria.nome}</CardTitle>
                <CardDescription>{categoria.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end gap-2">
                <Button onClick={() => editButton(categoria)} size="icon" variant={"outline"}><PenSquare size={18} /></Button>
                <Button onClick={() => deleteButton(categoria)} size="icon"><Trash size={18} /></Button>
            </CardContent>
        </Card>

    )
}