'use client'

import { SafeCategoria, SafeExercicio } from "@/types"
import { ComboboxExercicios } from "./ComboboxExercicios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import axios from "axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { PenSquare, Pencil, Trash, X } from "lucide-react"
import '@/prototype/string.extensions'
import { Modal } from "@/components/modalDialog"
import EditCategoriaForm from "./EditCategoriaForm"
import ExcluirCategoria from "./ExcluirCategoria"
import { useRouter } from "next/navigation"

interface SistemaDeCategoriasProps {
    initialCategoria: SafeCategoria
    initialExercicios: SafeExercicio[]
}

export default function SistemaDeCategorias({
    initialCategoria,
    initialExercicios
}: SistemaDeCategoriasProps) {
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isDeleteing, setIsDeleteing] = useState(false)
    const router = useRouter()

    const [exercicioSelecionado, setExercicioSelecionado] = useState("")

    const { data: exerciciosQuery } = useQuery({
        queryKey: ['exercicios'],
        queryFn: async () => {
            const response = await axios.get('/api/exercicios')
            const data = await response.data as SafeExercicio[]
            return data
        },
        initialData: initialExercicios
    })

    const { mutate: addExercicioButton, isLoading: atualizandoExercicio } = useMutation({
        mutationKey: ["exercicios"],
        mutationFn: async () => {
            const exercicioData = exerciciosQuery.find((exercicio) => exercicio.id === exercicioSelecionado.getIdFromExercicio())
            if (exercicioData) {
                const newExercicio: SafeExercicio = {
                    ...exercicioData,
                    categoriaId: initialCategoria.id
                }
                const response = await axios.patch(`/api/exercicios/${exercicioSelecionado.getIdFromExercicio()}`, newExercicio)
                if (response.status === 200) {

                    //aqui atualiza as informações sem precisar recriar o objeto
                    exercicioData.categoriaId = initialCategoria.id
                    toast.success("Exercício adicionado a categoria.")
                } else {
                    toast.error("Erro ao adicionar o exercício, status code: " + response.status)
                }
            }
        },
        onError: (err) => {
            toast.error("Erro ao adicionar o exercício.")
        }
    })

    const { mutate: removeExercicioButton, isLoading: isRemovingExercicio } = useMutation({
        mutationKey: ["exercicios"],
        mutationFn: async (exercicioToRemove: SafeExercicio) => {
            //este botão vai setar para undefined a categoriaId do exercício e depois atualizar esta informação no react query
            const exercicioToRemoveCopy = { ...exercicioToRemove }

            exercicioToRemoveCopy.categoriaId = undefined
            const response = await axios.patch(`/api/exercicios/${exercicioToRemoveCopy.id}`, exercicioToRemoveCopy)
            if (response.status === 200) {

                //aqui atualiza as informações sem precisar recriar o objeto
                exercicioToRemove.categoriaId = undefined
                toast.success("Exercício removido da categoria.")
            } else {
                toast.error("Erro ao remover o exercício, status code: " + response.status)
            }
        },
        onError: (err) => {
            toast.error("Erro ao remover o exercício.")
        }
    })

    const onCloseEdit = () => setIsEdit(false)
    const onCloseDelete = () => setIsDelete(false)

    const confirmDelete = async (categoriaId: string) => {
        //não posso apenas excluir no mesmo botão?
        console.log(categoriaId)

        try {
            setIsDeleteing(true)
            const { status } = await axios.delete(`/api/categorias/${categoriaId}`)

            if (status === 202) {
                toast.success("Categoria excluída!")
                onCloseDelete()
                router.push('/categorias')
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
        <div className="container">
            {/* Modal que edita */}
            <Modal
                description="Edite a categoria"
                isOpen={isEdit}
                onClose={onCloseEdit}
                title="Categoria"
                children={
                    <EditCategoriaForm
                        onClose={onCloseEdit}
                        descricao={initialCategoria.descricao}
                        id={initialCategoria.id}
                        nome={initialCategoria.nome}
                    />}
            />
            <Modal
                description={`Tem certeza que deseja excluir a categoria "${initialCategoria.nome}"?`}
                isOpen={isDelete}
                onClose={onCloseDelete}
                title="Excluir a categoria"
                children={
                    <ExcluirCategoria
                        onClose={onCloseDelete}
                        confirmDelete={confirmDelete}
                        isDeleting={isDeleteing}
                        id={initialCategoria.id}
                    />
                }
            />


            {/* Esta parte adiciona exercícios a categoria */}
            <div className="flex flex-col justify-center items-center gap-10">

                <span className="font-semibold text-2xl text-gray-500 drop-shadow-md">{initialCategoria.nome}</span>

                <div className="flex w-full justify-around">
                    <div className="flex flex-col gap-4">
                        <span className="font-medium">Exercícios:</span>
                        {exerciciosQuery
                            .filter((query) => query.categoriaId === initialCategoria.id)
                            .map((query, index) => (
                                <div key={index} className="flex gap-3 items-center justify-between">
                                    <span key={index}>{query.nome}</span>
                                    <Button disabled={isRemovingExercicio} onClick={() => removeExercicioButton(query)} variant={'outline'} size={"icon"}><Trash size={18} /></Button>
                                </div>
                            ))
                        }

                    </div>
                    <div className="flex flex-col gap-3">
                        <span>Adicionar o Exercício</span>
                        <div>
                            <ComboboxExercicios
                                exercicios={exerciciosQuery}
                                setValue={setExercicioSelecionado}
                                value={exercicioSelecionado}
                                disabled={atualizandoExercicio}
                            />
                        </div>
                        <Button disabled={exercicioSelecionado.getIdFromExercicio() === '' || atualizandoExercicio} onClick={() => addExercicioButton()}>Acidionar Exercicio</Button>
                    </div>
                </div>


            </div>

            {/* Esta parte vai ter o botão de excluir a categoria ou editar */}
            <div className="flex items-start mt-24">
                <div className="flex flex-col gap-4">
                    <Button
                        variant="outline"
                        className="flex gap-4 justify-start"
                        onClick={() => setIsEdit(true)}
                    >
                        <PenSquare size={18} />
                        <span>
                            Editar Nome e Descrição
                        </span>
                    </Button>
                    <Button
                        className="flex gap-4 justify-start"
                        onClick={() => setIsDelete(true)}
                    >
                        <Trash size={18} />
                        <span>
                            Excluir a categoria
                        </span>
                    </Button>

                </div>
            </div>


        </div>
    )
}