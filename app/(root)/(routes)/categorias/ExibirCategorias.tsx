'use client'

import { SafeCategoria } from "@/types"
import CategoriaCard from "./CategoriaCard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function ExibirCategorias({ initialCategorias }: { initialCategorias: SafeCategoria[] }) {
    const { data: categorias } = useQuery({
        queryKey: ["categorias"],
        queryFn: async () => {
            return (await axios.get("/api/categorias")).data as SafeCategoria[]
        },
        initialData: initialCategorias
    })
    return (
        <div className="mt-16 h-full flex items-center flex-wrap gap-8 justify-center">
            {categorias.map((categoria, index) => (
                <div
                    className="basis-4/6 md:basis-1/2 lg:basis-1/3"
                    key={index}>
                    <CategoriaCard categoria={categoria} />
                </div>
            ))}
        </div>
    )
}