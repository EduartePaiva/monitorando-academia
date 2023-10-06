import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriaCard() {
    return (
        <Card className="w-1/3">
            <CardHeader className="items-center">
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                teste
            </CardContent>
        </Card>

    )
}