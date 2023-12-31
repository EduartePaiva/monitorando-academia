import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SafeCategoria } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface CategorySelectProps {
    categorias: SafeCategoria[];
    setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export default function CategorySelect({
    categorias,
    setSelectedCategory
}: CategorySelectProps) {
    return (
        <Select defaultValue="all" onValueChange={(value) => setSelectedCategory(value)}>
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