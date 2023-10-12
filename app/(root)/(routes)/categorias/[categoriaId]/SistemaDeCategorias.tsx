'use client'

import { SafeCategoriaComExercicios, SafeExercicio } from "@/types"
import { ComboboxExercicios } from "./ComboboxExercicios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Trash, X } from "lucide-react"
import '@/prototype/string.extensions'

interface SistemaDeCategoriasProps {
    currentCategoria: SafeCategoriaComExercicios
    InitialExercicios: SafeExercicio[]
}

export default function SistemaDeCategorias({
    currentCategoria,
    InitialExercicios
}: SistemaDeCategoriasProps) {

    const [exercicioSelecionado, setExercicioSelecionado] = useState("")

    const { data: exerciciosQuery } = useQuery({
        queryKey: ['exercicios'],
        queryFn: async () => {
            const response = await axios.get('/api/exercicios')
            const data = await response.data as SafeExercicio[]
            return data
        },
        initialData: InitialExercicios
    })

    const { mutate: addExercicioButton, isLoading: atualizandoExercicio } = useMutation({
        mutationKey: ["exercicios"],
        mutationFn: async () => {
            const exercicioData = exerciciosQuery.find((exercicio) => exercicio.id === exercicioSelecionado.getIdFromExercicio())
            if (exercicioData) {
                const newExercicio: SafeExercicio = {
                    ...exercicioData,
                    categoriaId: currentCategoria.id
                }
                const response = await axios.patch(`/api/exercicios/${exercicioSelecionado.getIdFromExercicio()}`, newExercicio)
                if (response.status === 200) {

                    //aqui atualiza as informações sem precisar recriar o objeto
                    exercicioData.categoriaId = currentCategoria.id
                    toast.success("Exercício adicionado a categoria.")
                } else {
                    toast.error("Erro ao adicionar o exercício, status code: " + response.status)
                }
            }
        },
        onError: (err) => {
            toast.error("Erro ao adicionar o exercício.")
        }
    })

    const { mutate: removeExercicioButton, isLoading: isRemovingExercicio } = useMutation({
        mutationKey: ["exercicios"],
        mutationFn: async (exercicioToRemove: SafeExercicio) => {
            //este botão vai setar para undefined a categoriaId do exercício e depois atualizar esta informação no react query
            const exercicioToRemoveCopy = { ...exercicioToRemove }

            exercicioToRemoveCopy.categoriaId = undefined
            const response = await axios.patch(`/api/exercicios/${exercicioToRemoveCopy.id}`, exercicioToRemoveCopy)
            if (response.status === 200) {

                //aqui atualiza as informações sem precisar recriar o objeto
                exercicioToRemove.categoriaId = undefined
                toast.success("Exercício removido da categoria.")
            } else {
                toast.error("Erro ao remover o exercício, status code: " + response.status)
            }
        },
        onError: (err) => {
            toast.error("Erro ao remover o exercício.")
        }
    })



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
                                <div key={index} className="flex gap-3 items-center justify-between">
                                    <span key={index}>{query.nome}</span>
                                    <Button disabled={isRemovingExercicio} onClick={() => removeExercicioButton(query)} variant={'outline'} size={"icon"}><Trash size={18} /></Button>
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
                                disabled={atualizandoExercicio}
                            />
                        </div>
                        <Button disabled={exercicioSelecionado.getIdFromExercicio() === '' || atualizandoExercicio} onClick={() => addExercicioButton()}>Acidionar Exercicio</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}