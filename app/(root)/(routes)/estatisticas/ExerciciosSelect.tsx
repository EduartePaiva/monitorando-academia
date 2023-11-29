import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { SafeExercicio } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface ExercicySelectProps {
    exercicios: SafeExercicio[];
    setSelectedExercise: Dispatch<SetStateAction<string>>;
    selectedCategory: string
}

export default function ExercicySelect({
    exercicios,
    setSelectedExercise,
    selectedCategory

}: ExercicySelectProps) {
    return (
        <Select defaultValue="all" onValueChange={(value) => setSelectedExercise(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">Todos</SelectItem>
                    {exercicios.filter((exercicio) =>
                        selectedCategory === "all" || exercicio.categoriaId === selectedCategory
                    ).map((exercicio, index) => (
                        <SelectItem key={index} value={exercicio.id}>{exercicio.nome}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}