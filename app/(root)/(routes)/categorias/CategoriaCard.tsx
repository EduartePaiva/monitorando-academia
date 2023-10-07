import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoriaCardProps {
    titulo: string
    descricao: string
}

export default function CategoriaCard({
    descricao,
    titulo
}: CategoriaCardProps) {
    return (
        <Card className="w-1/3">
            <CardHeader className="items-center">
                <CardTitle>{titulo}</CardTitle>
                <CardDescription>{descricao}</CardDescription>
            </CardHeader>
            <CardContent>
                teste
            </CardContent>
        </Card>

    )
}