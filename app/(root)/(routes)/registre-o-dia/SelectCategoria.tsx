import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
    SelectTrigger
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SelectCategoriaProps {
    categorias: {
        id: string;
        nome: string;
    }[],
    setCategoriaSelecionadaId: Dispatch<SetStateAction<string>>
}

export default function SelectCategoria({
    categorias,
    setCategoriaSelecionadaId
}: SelectCategoriaProps) {
    return (
        <Select defaultValue="nenhuma" onValueChange={(categoriaId) => setCategoriaSelecionadaId(categoriaId)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Dia Da Semana" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* // 0 é igual a segunda, 6 é domingo, 7 são todos os dias */}
                    <SelectItem value="nenhuma" >Todas</SelectItem>
                    {categorias.map((categoria, index) => (
                        <SelectItem value={categoria.id} key={index}>{categoria.nome}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}