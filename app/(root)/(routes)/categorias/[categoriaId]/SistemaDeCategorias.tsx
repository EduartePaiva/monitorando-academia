'use client'

import { SafeCategoriaComExercicios, SafeExercicio } from "@/types"
import { ComboboxExercicios } from "./ComboboxExercicios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Trash, X } from "lucide-react"

interface SistemaDeCategoriasProps {
    currentCategoria: SafeCategoriaComExercicios
    InitialExercicios: SafeExercicio[]
}

export default function SistemaDeCategorias({
    currentCategoria,
    InitialExercicios
}: SistemaDeCategoriasProps) {
    const [exercicioSelecionado, setExercicioSelecionado] = useState("")
    const [isAdding, setIsAdding] = useState(false)

    const { data: exerciciosQuery } = useQuery({
        queryKey: ['exercicios'],
        queryFn: async () => {
            const response = await axios.get('/api/exercicios')
            const data = await response.data as SafeExercicio[]
            return data
        },
        initialData: InitialExercicios
    })



    const addExercicioButton = async () => {
        try {
            setIsAdding(true)

            const exercicioData = exerciciosQuery.find((exercicio) => exercicio.id === exercicioSelecionado)

            if (exercicioData) {
                exercicioData.categoriaId = currentCategoria.id
                const response = await axios.patch(`/api/exercicios/${exercicioSelecionado}`, exercicioData)
                if (response.status === 200) {
                    //aqui é onde receberá o novo exercício
                    const newExercicioData = response.data
                    console.log(newExercicioData)
                    toast.success("Exercício adicionado a categoria.")
                } else {
                    toast.error("Erro ao adicionar o exercício, status code: " + response.status)
                }
            }
        } catch (err) {
            toast.error("Erro ao adicionar o exercício.")
        } finally {
            setIsAdding(false)
        }
    }

    const removeExercicioButton = async (exercicioToRemove: SafeExercicio) => {
        //este botão vai setar para undefined a categoriaId do exercício e depois atualizar esta informação no react query

    }


    return (
        <div className="container">
            <div className="flex flex-col justify-center items-center gap-10">

                <span className="font-semibold text-2xl text-gray-500 drop-shadow-md">{currentCategoria.nome}</span>

                <div className="flex w-full justify-around">
                    <div className="flex flex-col gap-4">
                        <span className="font-medium">Exercícios:</span>
                        {exerciciosQuery
                            .filter((query) => query.categoriaId === currentCategoria.id)
                            .map((query, index) => (
                                <div className="flex gap-3 items-center justify-between">
                                    <span key={index}>{query.nome}</span>
                                    <Button onClick={() => removeExercicioButton(query)} variant={'outline'} size={"icon"}><Trash size={18} /></Button>
                                </div>
                            ))
                        }

                    </div>
                    <div className="flex flex-col gap-3">
                        <span>Adicionar o Exercício</span>
                        <div>
                            <ComboboxExercicios
                                exercicios={exerciciosQuery}
                                setValue={setExercicioSelecionado}
                                value={exercicioSelecionado}
                                disabled={isAdding}
                            />
                        </div>
                        <Button disabled={exercicioSelecionado === '' || isAdding} onClick={addExercicioButton}>Acidionar Exercicio</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}