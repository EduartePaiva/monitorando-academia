'use cllient'

import { useState } from "react"

interface AddExercicioProps {
    diaDaSemana: number
}

/*
os dias da semana começam com segunda = 0 e domingo = 6


*/


export default function AddExercicio({ diaDaSemana }: AddExercicioProps) {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<undefined | "BancoDeDados" | "Personalizado">()



    return (
        <div className="flex text-center font-semibold">
            <button
                className={`flex-1 border-2 p-2 ${opcaoSelecionada === "BancoDeDados" ? "nav-clicked" : "nav"}`}
                onClick={() => setOpcaoSelecionada("BancoDeDados")}
            >
                Adicionar exercício do banco de dados
            </button>
            <button
                className={`flex-1 border-2 p-2 ${opcaoSelecionada === "Personalizado" ? "nav-clicked" : "nav"}`}
                onClick={() => setOpcaoSelecionada("Personalizado")}
            >
                Adicionar exercício personalizado
            </button>
        </div>
    )
}