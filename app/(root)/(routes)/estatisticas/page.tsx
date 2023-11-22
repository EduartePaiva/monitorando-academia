'use client'
import { useQuery } from "@tanstack/react-query";
import CategorySelect from "./CategorySelect";
import axios from "axios";
import { SafeCategoria, SafeExercicio } from "@/types";
import ExercicySelect from "./ExerciciosSelect";
import { Button } from "@/components/ui/button";
import LineChart from "@/components/LineChart";


export default function EstatisticasPage() {
    const categorias = useQuery({
        queryFn: async () => {
            return (await axios.get('/api/categorias')).data as SafeCategoria[]
        }
    })
    const exercicios = useQuery({
        queryFn: async () => {
            return (await axios.get('/api/exercicios')).data as SafeExercicio[]
        }
    })

    return (
        <div className="container flex flex-col w-full gap-10">
            {/* Categoria e exercício filtros */}
            <div className="flex gap-20">
                <div className="flex items-center gap-2">
                    <div>Categorias</div>
                    {
                        categorias.data ? <CategorySelect categorias={categorias.data} />
                            :
                            <span>Carregando</span>
                    }
                </div>
                <div className="flex items-center gap-2">
                    <div>Exercícios</div>
                    {
                        exercicios.data ? <ExercicySelect exercicios={exercicios.data} />
                            :
                            <span>Carregando</span>
                    }
                </div>
            </div>
            {/* Filtros de data */}
            <div className="flex gap-10">
                <span>Periodo de tempo</span>
                <Button>Ultimo Mês</Button>
                <Button>Três Meses</Button>
                <Button>Ultimo Ano</Button>
                <Button>Personalizado</Button>
            </div>
            {/* Gráfico de linhas */}
            <div className="flex justify-center">
                <div className="sm:w-11/12 md:w-5/6  lg:w-2/3">
                    <LineChart />

                </div>
            </div>
        </div>
    )
}