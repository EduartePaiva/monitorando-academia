'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// vou salvar no localstorage
export default function ConfiguracaoPage() {
    return (
        <div className="container">
            <div className="flex justify-center flex-col items-center gap-5">
                <Button>
                    Adicionar Linha
                </Button>
                <span className="flex gap-3 justify-center items-center">
                    De
                    <Input className="w-14 text-lg" defaultValue={"1"} disabled />
                    a
                    <Input className="w-14 text-4xl" defaultValue={"∞"} disabled />
                    Reps, Importância
                    <Input
                        className="w-14 text-lg"
                        defaultValue={"100"}

                    />
                    %
                </span>
            </div>
        </div>
    )
}