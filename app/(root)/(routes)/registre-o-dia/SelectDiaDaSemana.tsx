'use client'

import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectGroup,
    SelectContent,
    SelectValue
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SelectDIaDaSemanaProps {
    setDiaDaSemana: Dispatch<SetStateAction<number>>
}

export default function SelectDiaDaSemana({
    setDiaDaSemana
}: SelectDIaDaSemanaProps) {
    return (
        <Select defaultValue="7" onValueChange={(dia) => setDiaDaSemana(parseInt(dia))}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Dia Da Semana" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* // 0 é igual a segunda, 6 é domingo, 7 são todos os dias */}
                    <SelectItem value="7" >Todos</SelectItem>
                    <SelectItem value="0">Segunda</SelectItem>
                    <SelectItem value="1">Terça</SelectItem>
                    <SelectItem value="2">Quarta</SelectItem>
                    <SelectItem value="3">Quinta</SelectItem>
                    <SelectItem value="4">Sexta</SelectItem>
                    <SelectItem value="5">Sábado</SelectItem>
                    <SelectItem value="6">Domingo</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}