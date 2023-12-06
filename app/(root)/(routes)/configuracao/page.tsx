'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// vou salvar no localstorage
interface configLogic {
    de: string;
    a: string;
    importancia: string
}


export default function ConfiguracaoPage() {
    const [confitList, setConfigList] = useState<configLogic[]>([{ de: '1', a: '∞', importancia: '100' }])

    const handleConfigAdd = () => setConfigList((prev) => [{ a: '', de: '', importancia: '' }, ...prev])
    const handleConfigRemove = () => {
        const configCopy = [...confitList]
        if (configCopy.length > 1) {
            configCopy.splice(configCopy.length - 2, 1)
            setConfigList(configCopy)
        }
    }
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => setConfigList((prev) => {
        const { value, name } = e.target
        if (!isNaN(+value)) {
            const copy = [...prev]
            if (name == 'a' || name == 'de' || name == 'importancia') {
                copy[index][name] = value
            }
            return copy
        } else {
            console.log('Não é unm número')
            return prev
        }
    })


    return (
        <div className="container">
            <div className="flex justify-center flex-col items-center gap-5">
                <div className="flex gap-4">
                    <Button onClick={handleConfigAdd} disabled={confitList.length > 4}>
                        Adicionar Linha
                    </Button>
                    {confitList.length > 1 &&
                        <Button variant='destructive' onClick={handleConfigRemove}>
                            Remover Linha
                        </Button>
                    }
                </div>
                <form action="" autoComplete="off" className="flex flex-col gap-4">
                    {confitList.map((config, index) => (
                        <span key={index} className="flex gap-3 justify-center items-center">
                            De
                            <Input
                                name="de"
                                id="de"
                                className="w-14 text-lg"
                                value={config.de}
                                disabled={index == confitList.length - 1}
                                onChange={(e) => handleChange(index, e)}
                            />
                            a
                            <Input
                                className="w-14 text-4xl"
                                value={config.a}
                                disabled={index == confitList.length - 1}
                                name="a"
                                id="a"
                                onChange={(e) => handleChange(index, e)}
                            />
                            Reps, Importância
                            <Input
                                className="w-14 text-lg"
                                value={config.importancia}
                                onChange={(e) => handleChange(index, e)}
                                name="importancia"
                                id="importancia"
                            />
                            %
                        </span>
                    ))}
                </form>
            </div>
        </div>
    )
}