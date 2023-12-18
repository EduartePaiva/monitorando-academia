'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Modal } from "../../../../../components/modalDialog";
import { MouseEvent, useState } from "react";
import EditarExercicioModal from "./EditarExercicioModal";
import { Exercicio } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditarExcluir({ exercicio }: { exercicio: Exercicio }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()


    const onClose = () => {
        setIsOpen(false)
    }

    const excluirExercicio = async (event: MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault()
            setIsDeleting(true)
            console.log('testando aqui')
            const response = await axios.delete(`/api/exercicios/${exercicio.id}`)
            const status = response.status
            if (status === 202) {
                toast.success("Exercício excluído!!!")
                router.push('/exercicios')
            }
        } catch (err) {

        } finally {
            setIsDeleting(false)
        }

    }

    return (
        <div className="w-full flex justify-end gap-4">
            <Modal
                description="Edite as informações do exercício"
                isOpen={isOpen}
                onClose={onClose}
                title="Editar o Exercício"
            >
                <EditarExercicioModal exercicio={exercicio} onClose={onClose} />
            </Modal>
            {/* Botão de editar o exercício */}
            <Button onClick={() => setIsOpen(true)} variant="outline">Editar Exercício</Button>

            {/* Botão de excluir o exercício. */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Excluir Exercício</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza que deseja excluir o exercício?</AlertDialogTitle>
                        <AlertDialogDescription>
                            A exclusão do exercício não poderá ser desfeita e você perderá os dados referente ao seu progresso
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction disabled={isDeleting} onClick={excluirExercicio}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}