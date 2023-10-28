import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface SelectExercicioProps {
    exercicios: {
        id: string;
        categoriaId: string | undefined;
        nome: string;
        // 0 é igual a segunda, 6 é domingo, 7 são todos os dias
        dia_da_semana: number;
    }[],
    diaDaSemana: number,
    //se nenhuma for o valor significa que todas as categorias são válidas
    categoriaId: string
    handleExercicioSelecionado: (selectedExercicio: string) => void
}

export default function SelectExercicio({
    exercicios,
    categoriaId,
    diaDaSemana,
    handleExercicioSelecionado
}: SelectExercicioProps) {

    const filteredExercicios = () => {
        if (diaDaSemana !== 7 && categoriaId !== 'nenhuma') {
            return exercicios.filter((exercicio) => (exercicio.dia_da_semana === diaDaSemana) && (exercicio.categoriaId === categoriaId))
        } else if (diaDaSemana === 7 && categoriaId !== 'nenhuma') {
            return exercicios.filter((exercicio) => exercicio.categoriaId === categoriaId)
        } else if (diaDaSemana !== 7 && categoriaId === 'nenhuma') {
            return exercicios.filter((exercicio) => exercicio.dia_da_semana === diaDaSemana)
        } else {
            return exercicios
        }
    }



    return (
        <Select onValueChange={((exercicioId) => handleExercicioSelecionado(exercicioId))}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Exercícios</SelectLabel>
                    {filteredExercicios().map((exercicio, index) => (
                        <SelectItem value={exercicio.id} key={index}>{exercicio.nome}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}