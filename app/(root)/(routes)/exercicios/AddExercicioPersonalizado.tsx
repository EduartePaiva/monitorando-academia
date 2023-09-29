'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { exercicioFormSchema } from "@/lib/zodSchemas"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"




export default function AddExercicioPersonalizado({ onClose, diaDaSemana }: { onClose: () => void, diaDaSemana: number }) {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof exercicioFormSchema>>({
        resolver: zodResolver(exercicioFormSchema),
        defaultValues: {
            descricao: "",
            nome: "",
            imageUrl: "",
            dia_da_semana: `${diaDaSemana}`
        }
    })

    async function onSubmit(data: z.infer<typeof exercicioFormSchema>) {
        try {
            setLoading(true)

            const response = await axios.post('/api/exercicios', data)
            console.log(response)
            toast.success('Exercício adicionado com sucesso!')

        } catch (err) {
            console.log(err)
            toast.error("Erro ao adicionar o exercício!")
        } finally {
            setLoading(false)
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
                                <Input disabled={loading} placeholder='Nome' {...field} />
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
                                <Textarea disabled={loading} placeholder='Insira a descrição do exercício' className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name='dia_da_semana'
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Selecione o dia da semana</FormLabel>
                            <div className="w-[50%]">

                                <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
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
                                <FormMessage />
                            </div>
                        </FormItem>

                    )}
                />

                <FormField
                    control={form.control}
                    name='imageUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url da imagem (Não obrigatório)</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder='Insira um URL de uma imagem do site imgur.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />


                <div className="flex justify-around">
                    <Button disabled={loading} variant="outline" type='submit' className="">Enviar</Button>
                    <Button disabled={loading} onClick={(e) => { e.preventDefault(); onClose(); }}>Cancelar</Button>

                </div>
            </form>
        </Form>
    )
}