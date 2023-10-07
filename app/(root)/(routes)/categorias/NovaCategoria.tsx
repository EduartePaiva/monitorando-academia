'use client'

import { Modal } from "@/components/modalDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddCategoriaForm from "./AddCategoriaForm";


export default function NovaCategoria({ className }: { className: string }) {
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)


    return (
        <div className={className}>
            <Modal
                description="descrição teste"
                isOpen={isOpen}
                onClose={onClose}
                title="teste"
                children={<AddCategoriaForm onClose={onClose} />}
            />
            <Button onClick={() => setIsOpen(true)}>
                Nova Categoria
            </Button>

        </div>
    )
}