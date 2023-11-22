import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { SafeExercicio } from "@/types";

interface ExercicySelectProps {
    exercicios: SafeExercicio[]
}

export default function ExercicySelect({
    exercicios
}: ExercicySelectProps) {
    return (
        <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">Todos</SelectItem>
                    {exercicios.map((exercicio, index) => (
                        <SelectItem key={index} value={exercicio.id}>{exercicio.nome}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}