'use cllient'

import { useState } from "react"
import AddExercicioPersonalizado from "./AddExercicioPersonalizado"
import AddExercicioBanco from "./AddExercicioBanco"

interface AddExercicioProps {
    diaDaSemana: number
}

/*
os dias da semana começam com segunda = 0 e domingo = 6
*/

export default function AddExercicio({ diaDaSemana }: AddExercicioProps) {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<undefined | "BancoDeDados" | "Personalizado">()



    return (
        <div className="border-2 rounded-sm flex flex-col">
            <div className="flex text-center font-semibold">
                <button
                    className={`flex-1 p-2 border-r rounded-br-sm ${opcaoSelecionada === "BancoDeDados" ? "nav-clicked" : "nav border-b-2"}`}
                    onClick={() => setOpcaoSelecionada("BancoDeDados")}
                >
                    Adicionar exercício do <br />banco de dados
                </button>
                <button
                    className={`flex-1 p-2 border-l rounded-bl-sm ${opcaoSelecionada === "Personalizado" ? "nav-clicked" : "nav border-b-2"}`}
                    onClick={() => setOpcaoSelecionada("Personalizado")}
                >
                    Adicionar exercício<br />personalizado
                </button>
            </div>

            <div>
                {opcaoSelecionada === 'Personalizado' && <AddExercicioPersonalizado />}
                {opcaoSelecionada === 'BancoDeDados' && <AddExercicioBanco />}
                {opcaoSelecionada === undefined && (<div className="w-full h-24 leading-[6rem] text-center text-gray-800">Selecione uma opção acima</div>)}
            </div>
        </div>
    )
}