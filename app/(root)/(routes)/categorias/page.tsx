import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CategoriasPage() {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent className="">
                <SelectItem value="0">Segunda</SelectItem>
                <SelectItem value="1">Terça</SelectItem>
                <SelectItem value="2">Quarta</SelectItem>
                <SelectItem value="3">Quinta</SelectItem>
                <SelectItem value="4">Sexta</SelectItem>
                <SelectItem value="5">Sábado</SelectItem>
                <SelectItem value="6">Domingo</SelectItem>
            </SelectContent>
        </Select>
    )
}
