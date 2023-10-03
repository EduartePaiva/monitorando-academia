export default function page({ params }: { params: { exercicioId: string } }) {
    return (
        <div>{params.exercicioId}</div>
    )
}