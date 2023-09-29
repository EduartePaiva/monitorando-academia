'use cllient'

import { useState } from "react"
import AddExercicioPersonalizado from "./AddExercicioPersonalizado"
import AddExercicioBanco from "./AddExercicioBanco"

interface AddExercicioProps {
    diaDaSemana: number
    onClose: () => void
}

/*
os dias da semana começam com segunda = 0 e domingo = 6
*/

export default function AddExercicio({ diaDaSemana, onClose }: AddExercicioProps) {
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<undefined | "BancoDeDados" | "Personalizado">()



    return (
        <div className="border-2 rounded-sm flex flex-col max-h-[75vh]">
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


            <div className="h-full overflow-y-auto">
                {opcaoSelecionada === 'Personalizado' && <AddExercicioPersonalizado onClose={onClose} diaDaSemana={diaDaSemana} />}
                {opcaoSelecionada === 'BancoDeDados' && <AddExercicioBanco />}
                {opcaoSelecionada === undefined && (<div className="w-full h-24 leading-[6rem] text-center text-gray-800">Selecione uma opção acima</div>)}
            </div>
        </div>
    )
}