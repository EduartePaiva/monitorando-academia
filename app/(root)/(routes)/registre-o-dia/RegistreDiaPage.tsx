'use client'

import { ChangeEvent, useRef, useState } from "react"
import SelectDiaDaSemana from "./SelectDiaDaSemana"
import SelectCategoria from "./SelectCategoria"
import SelectExercicio from "./SelectExercicio"
import { Input } from "@/components/ui/input"
import SeriesRegister from "./SeriesRegister"
import { Button } from "@/components/ui/button"
import { Serie } from "@/types"
import axios from "axios"
import { regDiaFormSchema } from "@/lib/zodSchemas"
import toast from "react-hot-toast"

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
    const [arraySeries, setArraySeries] = useState<Serie[]>([])
    const [showButton, setShowButton] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleExercicioSelecionado = (selectedExercicio: string) => {
        setExercicioSelecionado(selectedExercicio)
        setNumeroDeSeries(0)
        setShowButton(false)
        setArraySeries([])
        if (inputRef.current) inputRef.current.value = ''

    }

    const handleInputSeries = async (event: ChangeEvent<HTMLInputElement>) => {
        const exercicioSelect = parseInt(event.target.value)
        if (!isNaN(exercicioSelect) && exercicioSelect > 0 && exercicioSelect < 10) {
            for (let i = 0; i <= exercicioSelect; i++) {
                setNumeroDeSeries(i)
                await new Promise(resolve => {
                    setTimeout(resolve, 200)
                })
            }
            setShowButton(true)
            setArraySeries([])
        }
    }

    const handleRegOTreino = async () => {
        try {
            setIsSending(true)

            const thereIsData = arraySeries[0] && arraySeries[0].carga > 0 && arraySeries[0].reps > 0 &&
                exercicioSelecionado !== 'nenhum' && numeroDeSeries > 0

            if (thereIsData) {
                console.log('foi aqui')
                const data = regDiaFormSchema.parse({
                    exercicioId: exercicioSelecionado,
                    numeroDeSeries: numeroDeSeries,
                    series: JSON.stringify(arraySeries),
                })

                const response = await axios.post('/api/registre-o-dia', data)

                if (response.status === 200) {
                    toast.success('Treino registrado com sucesso!')

                    //aqui eu estou resetando todos os states
                    setArraySeries([])
                    setExercicioSelecionado('nenhum')
                    setNumeroDeSeries(0)
                    setShowButton(false)

                } else {
                    toast.error("Erro ao registrar o treino!")
                }
            } else {
                toast.error("Você não preencheu alguma coisa, confita o preenchimento.")
            }

        } catch (erro) {
            toast.error("Erro ao registrar o treino!")
        } finally {
            setIsSending(false)
        }
    }


    return (
        <div className="container h-full flex flex-col items-center justify-center gap-6 flex-wrap">
            <div>
                <div className="text-lg font-semibold mb-2">
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
                                handleExercicioSelecionado={handleExercicioSelecionado}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className={`${exercicioSelecionado === 'nenhum' ? "hidden" : "animate-[fade-in2_500ms_forwards]"}`}>
                <div className="text-lg font-semibold mb-2">
                    Nº De Séries
                </div>
                <div className="flex items-start">
                    <div className="flex flex-col gap-2">
                        <div className="ml-6 flex gap-4 items-center justify-between">
                            <span>Séries</span>
                            <Input
                                onChange={handleInputSeries}
                                type="number"
                                className="disable-input-arrow"
                                ref={inputRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SeriesRegister
                numDeSeries={numeroDeSeries}
                setArraySeries={setArraySeries}
            />
            <Button
                className={`${!showButton ? "hidden" : "animate-[fade-in2_500ms_forwards]"}`}
                onClick={() => handleRegOTreino()}
                disabled={isSending}
            >
                Registrar O Treino
            </Button>
        </div>
    )
}