'use client'

import { Button } from "@/components/ui/button";
import { SafeCategoria } from "@/types";

interface ExcluirCategoriaProps {
    onClose: () => void
    categoriaDelete?: SafeCategoria
    confirmDelete: (categoria: string) => void,
    isDeleting: boolean
}

export default function ExcluirCategoria({
    categoriaDelete,
    onClose,
    confirmDelete,
    isDeleting
}: ExcluirCategoriaProps) {
    return (
        <div className="flex justify-around">
            <Button disabled={isDeleting} variant='outline' onClick={onClose}>Cancelar</Button>
            {categoriaDelete && <Button disabled={isDeleting} onClick={() => confirmDelete(categoriaDelete.id)}>{isDeleting ? 'Excluindo' : 'Excluir'}</Button>}

        </div>
    )
}