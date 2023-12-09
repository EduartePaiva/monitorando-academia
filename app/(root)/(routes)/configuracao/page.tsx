'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { configLogicZod } from "@/lib/zodSchemas";
import { configLogic } from "@/types";
// vou salvar no localstorage


export default function ConfiguracaoPage() {
    const { user } = useUser()
    const [confitList, setConfigList] = useState<configLogic[]>([{ de: '1', a: '∞', importancia: '100' }])
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        try {
            const configData = configLogicZod.parse(user?.unsafeMetadata.configList)
            setConfigList(configData)
        } catch (e) {
            toast.error('erro clerk')
        }
    }, [user?.unsafeMetadata.configList])

    const handleConfigAdd = () => setConfigList((prev) => {
        const cop = [...prev]
        cop.splice(cop.length - 1, 0, { a: '', de: '', importancia: '' })
        return cop
    })
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
                copy[copy.length - 1].de = `${parseInt(copy[copy.length - 2].a) + 1}`
            }
            return copy
        } else {
            //console.log('Não é um número')
            return prev
        }
    })
    const handleSave = async () => {
        //checar se a configuração está certa
        try {
            setSaving(true)
            let configValida = true
            for (let i = 1; i < confitList.length; i++) {
                const de = parseInt(confitList[i - 1].de)
                const para = parseInt(confitList[i - 1].a)
                const atual = parseInt(confitList[i].de)
                if (!(de < para && atual == para + 1)) configValida = false
            }
            if (configValida) {
                await user?.update({
                    unsafeMetadata: {
                        configList: confitList
                    }
                })
                toast.success('Alterações salvas')
            } else {
                toast.error('Configuração inválida, reveja e tente novamente')
            }
        } catch (err) {
            toast.error("Erro ao salvar!")
        } finally {
            setSaving(false)
        }
    }


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
                                className={`w-14 ${config.a == '∞' ? 'text-4xl' : 'text-lg'}`}
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
                <Button variant='outline' onClick={handleSave} disabled={saving}>
                    Salvar Alretações
                </Button>
            </div>
        </div>
    )
}