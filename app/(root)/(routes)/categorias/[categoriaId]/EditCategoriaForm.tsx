'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { categoriaFormSchema } from "@/lib/zodSchemas"
import { SafeCategoria } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from 'zod'

interface EditCategoriaFormProps {
    onClose: () => void
    nome: string,
    descricao: string,
    id: string

}

export default function EditCategoriaForm({
    onClose,
    descricao,
    id,
    nome
}: EditCategoriaFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()


    const form = useForm<z.infer<typeof categoriaFormSchema>>({
        resolver: zodResolver(categoriaFormSchema),
        defaultValues: {
            descricao,
            nome
        }
    })

    const onSubmit = async (dados: z.infer<typeof categoriaFormSchema>) => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/categorias/${id}`, dados)
            const data: SafeCategoria = response.data
            if (response.status === 200) {
                toast.success("Categoria adicionada com sucesso!")

                const oldData = queryClient.getQueryData<SafeCategoria[]>(['categorias'])
                if (oldData) {
                    const newData = [...oldData]
                    const safeCategoria = newData.find((exerc) => exerc.id === data.id)

                    if (safeCategoria) {
                        safeCategoria.descricao = data.descricao
                        safeCategoria.nome = data.nome

                        queryClient.setQueryData(['categorias'], newData)
                    }

                }
                onClose()
            } else {
                console.log(response.status)
                toast.error("Algum erro ocorreu, status: " + response.status)
            }
        } catch (err) {
            toast.error("Falha ao adicionar a categoria.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 m-4'
            >
                <FormField
                    control={form.control}
                    name='nome'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da categoria</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder='Nome' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name='descricao'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea disabled={isLoading} placeholder='Insira a descrição do exercício' className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <div className="flex justify-around">
                    <Button disabled={isLoading} variant="outline" type='submit' className="">{isLoading ? 'Editando' : 'Editar'}</Button>
                    <Button disabled={isLoading} onClick={(e) => { e.preventDefault(); onClose(); }}>Cancelar</Button>

                </div>
            </form>
        </Form>
    )
}