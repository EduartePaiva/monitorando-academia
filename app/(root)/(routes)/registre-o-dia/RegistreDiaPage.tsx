'use client'

import { ChangeEvent, useState } from "react"
import SelectDiaDaSemana from "./SelectDiaDaSemana"
import SelectCategoria from "./SelectCategoria"
import SelectExercicio from "./SelectExercicio"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface RegistreDiaPageProps {
    exercicios: {
        id: string;
        categoriaId: string | undefined;
        nome: string;
        dia_da_semana: number;
    }[],
    categorias: {
        id: string;
        nome: string;
    }[]
}


export default function RegistreDiaPage({
    categorias,
    exercicios
}: RegistreDiaPageProps) {
    // 0 é igual a segunda, 6 é domingo, 7 são todos os dias
    const [diaDaSemana, setDiaDaSemana] = useState(7)

    //se nenhuma for o valor significa que todas as categorias são válidas
    const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState('nenhuma')

    const [exercicioSelecionado, setExercicioSelecionado] = useState('nenhum')

    const [numeroDeSeries, setNumeroDeSeries] = useState(0)

    const handleInputSeries = (event: ChangeEvent<HTMLInputElement>) => {
        const exercicioSelect = parseInt(event.target.value)
        if (!isNaN(exercicioSelect) && exercicioSelect > 0 && exercicioSelect < 10) {
            setNumeroDeSeries(exercicioSelect)
            //amanhã vou fazer a animação para aparecer o número de series, vai ter um botão de enviar e quando eu selecionar o exercício o numero de series vai aparecer na tela
        }
    }


    return (
        <div className="container flex justify-around">
            <div>
                <div className="text-lg font-semibold mb-6">
                    Filtros
                </div>
                <div className="flex items-start">
                    <div className="flex flex-col gap-2">
                        <div className="ml-6 flex gap-4 items-center justify-between">
                            <span>Dia da Semana</span>
                            <SelectDiaDaSemana setDiaDaSemana={setDiaDaSemana} />
                        </div>
                        <div className="ml-6 flex gap-4 items-center justify-between">
                            <span>Categoria</span>
                            <SelectCategoria categorias={categorias} setCategoriaSelecionadaId={setCategoriaSelecionadaId} />
                        </div>
                        <div className="ml-6 flex gap-4 items-center justify-between">
                            <span>Exercício</span>
                            <SelectExercicio
                                exercicios={exercicios}
                                diaDaSemana={diaDaSemana}
                                categoriaId={categoriaSelecionadaId}
                                setExercicioSelecionado={setExercicioSelecionado}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className="text-lg font-semibold mb-6">
                    Nº De Séries
                </div>
                <div className="flex items-start">
                    <div className="flex flex-col gap-2">
                        <div className="ml-6 flex gap-4 items-center justify-between">
                            <span>Séries</span>
                            <Input
                                onChange={handleInputSeries}
                                type="number"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}