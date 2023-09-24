interface AddExercicioProps {
    diaDaSemana: number
}

/*
os dias da semana começam com segunda = 0 e domingo = 6


*/


export default function AddExercicio({ diaDaSemana }: AddExercicioProps) {
    return (
        <div>{diaDaSemana}</div>
    )
}