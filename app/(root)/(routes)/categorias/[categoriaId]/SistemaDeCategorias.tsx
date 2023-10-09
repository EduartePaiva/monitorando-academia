'use client'

import { SafeCategoriaComExercicios, SafeExercicio } from "@/types"
import { ComboboxExercicios } from "./ComboboxExercicios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

interface SistemaDeCategoriasProps {
    currentCategoria: SafeCategoriaComExercicios
    exercicios: SafeExercicio[]
}

export default function SistemaDeCategorias({
    currentCategoria,
    exercicios
}: SistemaDeCategoriasProps) {
    const [exercicioSelecionado, setExercicioSelecionado] = useState("")

    const [isAdding, setIsAdding] = useState(false)

    const addExercicioButton = async () => {
        //console.log(exercicioSelecionado)
        //console.log(currentCategoria)

        try {
            setIsAdding(true)
            toast.success("Exercício adicionado a categoria.")
        } catch (err) {
            toast.error("Erro ao adicionar o exercício.")
        } finally {
            setIsAdding(false)
        }

    }

    return (
        <div className="container">
            <div className="flex flex-col justify-center items-center gap-10">

                <span className="font-semibold text-2xl text-gray-500 drop-shadow-md">{currentCategoria.nome}</span>

                <div className="flex w-full justify-around">
                    <div>
                        <span>Exercícios</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span>Adicionar o Exercício</span>
                        <div>
                            <ComboboxExercicios
                                exercicios={exercicios}
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