import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NovaCategoria from "./NovaCategoria";
import CategoriaCard from "./CategoriaCard";

export default function CategoriasPage() {
    return (
        <div className="container h-full">
            <div className="flex flex-col h-full">
                <NovaCategoria className="self-end absolute" />
                <div className="h-full flex items-center flex-col gap-16 justify-center">

                    <CategoriaCard />
                    <CategoriaCard />
                    <CategoriaCard />
                </div>
            </div>
        </div>
    )
}
