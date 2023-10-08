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
import { useState } from "react"


interface ComboboxExerciciosProps {
    exercicios: SafeExercicio[]
}

export function ComboboxExercicios({
    exercicios
}: ComboboxExerciciosProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    console.log(value)
    const frameworks = [
        {
            value: exercicios[0].id,
            label: exercicios[0].nome,
        },
        {
            value: exercicios[1].id,
            label: exercicios[1].nome,
        },
    ]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[230px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Selecione o exercício..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[230px] p-0">
                <Command>
                    <CommandInput placeholder="Procurar exercício..." />
                    <CommandEmpty>Nenhum exercício encontrado.</CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                onSelect={(currentValue) => {
                                    console.log(currentValue)
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                    console.log('clocou')
                                }}
                                value={framework.value}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
