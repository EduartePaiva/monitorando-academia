'use client'

import { SafeCategoria } from "@/types"
import CategoriaCard from "./CategoriaCard"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Modal } from "@/components/modalDialog"
import { useState } from "react"
import EditCategoriaForm from "./[categoriaId]/EditCategoriaForm"
import ExcluirCategoria from "./[categoriaId]/ExcluirCategoria"
import toast from "react-hot-toast"

export default function ExibirCategorias({ initialCategorias }: { initialCategorias: SafeCategoria[] }) {



    const queryClient = useQueryClient()


    const { data: categorias } = useQuery({
        queryKey: ["categorias"],
        queryFn: async () => {
            return (await axios.get("/api/categorias")).data as SafeCategoria[]
        },
        initialData: initialCategorias
    })







    return (
        <div className="h-full flex items-center flex-col gap-16 justify-center">
            {categorias.map((categoria, index) => (
                <CategoriaCard key={index} categoria={categoria} />
            ))}
        </div>
    )
}