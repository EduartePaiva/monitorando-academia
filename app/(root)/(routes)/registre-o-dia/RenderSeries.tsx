import { Input } from "@/components/ui/input";
import { Serie } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface RenderSeriesProps {
    numero: number,
    setArraySerie: Dispatch<SetStateAction<Serie[]>>
}

export default function RenderSeries({
    numero,
    setArraySerie
}: RenderSeriesProps) {
    const index = numero - 1

    return (
        <div className="animate-[fade-in_500ms_forwards]">
            <div className="text-lg font-semibold mb-2">
                {numero}ª Serie
            </div>
            <div className="flex items-start">
                <div className="flex flex-col gap-2">
                    <div className="ml-6 flex gap-4 items-center justify-between">
                        <span>Nº Repetições</span>
                        <Input
                            onChange={(event) => {
                                const numReps = parseInt(event.target.value)
                                if (!isNaN(numReps) && numReps > 0) {
                                    setArraySerie((prevValue) => {
                                        if (prevValue[index]) {
                                            prevValue[index].numeroDeRepeticoes = numReps
                                        } else {
                                            prevValue[index] = {
                                                carga: 0,
                                                numeroDeRepeticoes: numReps
                                            }
                                        }

                                        return [...prevValue]
                                    })
                                }
                            }}
                            className="w-16 disable-input-arrow"
                            type="number"
                        />
                    </div>
                    <div className="ml-6 flex gap-4 items-center justify-between">
                        <span>Carga Kg</span>
                        <Input
                            onChange={(event) => {
                                const carga = parseInt(event.target.value)
                                if (!isNaN(carga) && carga > 0) {
                                    setArraySerie((prevValue) => {
                                        if (prevValue[index]) {
                                            prevValue[index].carga = carga
                                        } else {
                                            prevValue[index] = {
                                                carga: carga,
                                                numeroDeRepeticoes: 0
                                            }
                                        }

                                        return [...prevValue]
                                    })
                                }
                            }}
                            className="w-16 disable-input-arrow"
                            type="number"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}