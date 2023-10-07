import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { categoriaFormSchema } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from 'zod'

interface AddCategoriaFormProps {
    onClose: () => void
}

export default function AddCategoriaForm({
    onClose
}: AddCategoriaFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


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
                router.refresh()
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
                            <FormLabel>Nome do exercício</FormLabel>
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
                    <Button disabled={isLoading} variant="outline" type='submit' className="">Enviar</Button>
                    <Button disabled={isLoading} onClick={(e) => { e.preventDefault(); onClose(); }}>Cancelar</Button>

                </div>
            </form>
        </Form>
    )
}