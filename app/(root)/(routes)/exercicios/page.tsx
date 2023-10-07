'use client'

import { Plus } from "lucide-react";
import { Modal } from "../../../../components/modalDialog";
import { useState } from "react";
import AddExercicio from "./AddExercicio";
import { useQuery } from "@tanstack/react-query";
import { SafeExercicio, exercicioGet } from "@/types";
import axios from "axios";
import Link from "next/link";

const dias_da_semana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM']

export default function ExerciciosPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [diaDaSemana, setDiaDaSemana] = useState(0)

    const handleOnClick = (dia: number) => {
        setDiaDaSemana(dia)
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['exercicios'],
        queryFn: async () => {
            const response = await axios.get('/api/exercicios')
            const data = await response.data as SafeExercicio[]
            return data
        }
    })


    return (
        <div className="flex justify-center">
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Adicionando Treino"
                description="Adicione o Exercício!"
                children={<AddExercicio diaDaSemana={diaDaSemana} onClose={onClose} />}
            />

            {dias_da_semana.map((dia, index) => (
                <div className="flex flex-col items-center w-28" key={index}>
                    <span className="w-full leading-[3rem] h-12 text-center bg-gray-100 font-semibold text-gray-800">
                        {dia}
                    </span>
                    {data && data.filter((exercicio) => exercicio.dia_da_semana === index).map((exercicio) => (
                        <Link href={`/exercicios/${exercicio.id}`} key={exercicio.id} className="flex w-full justify-center items-center h-12 bg-gray-50 hover:bg-gray-800 hover:text-white transition duration-300">
                            {exercicio.nome}
                        </Link>
                    ))}

                    {/* coisas podem ser infinitamente adicionadas aqui */}
                    <button
                        className="flex w-full justify-center items-center h-12 bg-gray-50 hover:bg-gray-800 hover:text-white transition duration-300"
                        onClick={() => handleOnClick(index)}
                    >
                        <Plus size={30} />
                    </button>
                </div>
            ))}
        </div>
    )
}

/*

    MODELAMENTO DO BANCO DE DADOS:

    EXERCÍCIOS VAI TER:

        ID,
        ID DO USUÁRIO,
        NOME DO EXERCÍCIO,
        DESCRIÇÃO,
        DIA DA SEMANA,
        IMAGEM,
        CATEGORIA,
        CRIADO EM,
        ATUALIZADO EM,
*/