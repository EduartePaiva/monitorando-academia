import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SafeCategoria } from "@/types";

interface CategorySelectProps {
    categorias: SafeCategoria[]
}

export default function CategorySelect({
    categorias
}: CategorySelectProps) {
    return (
        <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">Todas</SelectItem>
                    {categorias.map((categoria, index) => (
                        <SelectItem key={index} value={categoria.id}>{categoria.nome}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}