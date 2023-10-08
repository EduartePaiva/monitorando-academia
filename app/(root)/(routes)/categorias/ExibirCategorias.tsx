'use client'

import { SafeCategoria } from "@/types"
import CategoriaCard from "./CategoriaCard"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Modal } from "@/components/modalDialog"
import { useState } from "react"
import EditCategoriaForm from "./EditCategoriaForm"
import ExcluirCategoria from "./ExcluirCategoria"
import toast from "react-hot-toast"

export default function ExibirCategorias({ initialCategorias }: { initialCategorias: SafeCategoria[] }) {
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isDeleteing, setIsDeleteing] = useState(false)
    const [categoriaEditDelete, setCategoriaEditDelete] = useState<SafeCategoria>()


    const queryClient = useQueryClient()


    const { data: categorias } = useQuery({
        queryKey: ["categorias"],
        queryFn: async () => {
            return (await axios.get("/api/categorias")).data as SafeCategoria[]
        },
        initialData: initialCategorias
    })


    const onCloseEdit = () => setIsEdit(false)
    const onCloseDelete = () => setIsDelete(false)

    const editButton = (buttonCategoriaId: SafeCategoria) => {
        setCategoriaEditDelete(buttonCategoriaId)
        setIsEdit(true)
    }

    const deleteButton = (buttonCategoriaId: SafeCategoria | undefined) => {
        //este botão é acionado quando clica no ícone de lixeira
        setIsDelete(true)
        setCategoriaEditDelete(buttonCategoriaId)
    }

    const confirmDelete = async (categoriaId: string) => {
        //não posso apenas excluir no mesmo botão?
        console.log(categoriaId)

        try {
            setIsDeleteing(true)
            const { status } = await axios.delete(`/api/categorias/${categoriaId}`)

            if (status === 202) {
                toast.success("Categoria excluída!")
                const newCategorias = categorias.filter((categoria) => {
                    return categoria.id !== categoriaId
                })

                queryClient.setQueryData(["categorias"], newCategorias)

                onCloseDelete()
            } else {
                toast.error("Algum erro ocorreu na exclusão.")
            }
        } catch (err) {
            toast.error("Algum erro ocoddeu na exclusão.")
        } finally {
            setIsDeleteing(false)
        }
    }


    return (
        <div className="h-full flex items-center flex-col gap-16 justify-center">

            {/* Modal que edita */}
            <Modal
                description="Edite a categoria"
                isOpen={isEdit}
                onClose={onCloseEdit}
                title="Categoria"
                children={<EditCategoriaForm onClose={onCloseEdit} categoriaEdit={categoriaEditDelete} />}
            />
            <Modal
                description="Tem certeza que deseja excluir a categoria?"
                isOpen={isDelete}
                onClose={onCloseDelete}
                title="Excluir a categoria"
                children={
                    <ExcluirCategoria
                        onClose={onCloseDelete}
                        categoriaDelete={categoriaEditDelete}
                        confirmDelete={confirmDelete}
                        isDeleting={isDeleteing}
                    />
                }
            />


            {categorias.map((categoria, index) => (
                <CategoriaCard deleteButton={deleteButton} editButton={editButton} key={index} categoria={categoria} />
            ))}
        </div>
    )
}