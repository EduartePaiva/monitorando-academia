'use client'

import { Button } from "@/components/ui/button";
import { SafeCategoria } from "@/types";

interface ExcluirCategoriaProps {
    onClose: () => void
    confirmDelete: (categoria: string) => void,
    isDeleting: boolean
    id: string
}

export default function ExcluirCategoria({
    onClose,
    confirmDelete,
    isDeleting,
    id
}: ExcluirCategoriaProps) {
    return (
        <div className="flex justify-around">
            <Button disabled={isDeleting} variant='outline' onClick={onClose}>Cancelar</Button>
            <Button disabled={isDeleting} onClick={() => confirmDelete(id)}>{isDeleting ? 'Excluindo' : 'Excluir'}</Button>

        </div>
    )
}