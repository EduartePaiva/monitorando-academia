"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SafeExercicio } from "@/types"
import { Dispatch, SetStateAction, useState } from "react"
import '@/prototype/string.extensions'


interface ComboboxExerciciosProps {
    exercicios: SafeExercicio[]
    value: string
    setValue: Dispatch<SetStateAction<string>>,
    disabled?: boolean
}

export function ComboboxExercicios({
    exercicios,
    setValue,
    value,
    disabled
}: ComboboxExerciciosProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[230px] justify-between"
                >
                    {/* Aqui eu utilizo o split para pegar o id do item selecionado */}
                    {value
                        ? exercicios.find((exercicio) => exercicio.id === value.split('&-&')[1])?.nome
                        : "Selecione o exercício..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[230px] p-0">
                <Command>
                    <CommandInput placeholder="Procurar exercício..." />
                    <CommandEmpty>Nenhum exercício encontrado.</CommandEmpty>
                    <CommandGroup>
                        {exercicios.map((exercicio) => (
                            <CommandItem
                                key={exercicio.id}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                                value={`${exercicio.nome}&-&${exercicio.id}`}
                                title={exercicio.nome}
                            >
                                {/* Aqui acima eu coloquei &-& como separador do nome e do id, isto foi feito para dar a volta em uma limitação da biblioteca utilizada */}
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === exercicio.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <span className={exercicio.categoriaId ? "text-gray-500" : ""}>
                                    {exercicio.nome}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
