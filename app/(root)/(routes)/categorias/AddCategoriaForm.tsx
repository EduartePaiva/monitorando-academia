'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { categoriaFormSchema } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from 'zod'

interface AddCategoriaFormProps {
    onClose: () => void
}

export default function AddEditCategoriaForm({
    onClose

}: AddCategoriaFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()


    const form = useForm<z.infer<typeof categoriaFormSchema>>({
        resolver: zodResolver(categoriaFormSchema),
        defaultValues: {
            descricao: "",
            nome: ""
        }
    })

    const onSubmit = async (dados: z.infer<typeof categoriaFormSchema>) => {
        try {
            setIsLoading(true)
            const { status } = await axios.post("/api/categorias", dados)

            if (status === 200) {
                toast.success("Categoria adicionada com sucesso!")
                queryClient.invalidateQueries(["categorias"])
                onClose()
            } else {
                console.log(status)
                toast.error("Algum erro ocorreu, status: " + status)
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
                                <Textarea disabled={isLoading} placeholder='Insira a descrição da categoria' className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />


                <div className="flex justify-around">
                    <Button disabled={isLoading} variant="outline" type='submit' className="">Criar</Button>
                    <Button disabled={isLoading} onClick={(e) => { e.preventDefault(); onClose(); }}>Cancelar</Button>

                </div>
            </form>
        </Form>
    )
}