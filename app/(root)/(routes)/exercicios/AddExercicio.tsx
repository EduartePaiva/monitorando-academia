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
import axios from 'axios'
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SafeExercicio } from "@/types"

interface AddExercicioProps {
    diaDaSemana: number
    onClose: () => void
}

export default function AddExercicio({
    diaDaSemana,
    onClose
}: AddExercicioProps) {
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof exercicioFormSchema>>({
        resolver: zodResolver(exercicioFormSchema),
        defaultValues: {
            descricao: "",
            nome: "",
            imageUrl: "",
            dia_da_semana: `${diaDaSemana}`
        }
    })

    const { isLoading, mutate: onSubmitMutate } = useMutation({
        mutationKey: ['exercicios'],
        mutationFn: async (dados: z.infer<typeof exercicioFormSchema>) => {
            return axios.post('/api/exercicios', dados)
        },
        onSuccess: (response) => {
            //possivel bug aqui estou só considerando caso seja adicionado
            const data: SafeExercicio = response.data
            console.log(data)
            toast.success('Exercício adicionado com sucesso!')
            const oldData = queryClient.getQueryData<SafeExercicio[]>(['exercicios'])
            if (oldData) {
                queryClient.setQueryData(['exercicios'], [...oldData, data])
            }
            onClose()
        },
        onError: (err) => {
            console.log(err)
            toast.error("Erro ao adicionar o exercício!")
        }
    })

    return (
        <div className="border-2 rounded-sm max-h-[75vh] h-full overflow-y-auto">

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => onSubmitMutate(data))}
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
                    <FormField
                        control={form.control}
                        name='dia_da_semana'
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Selecione o dia da semana</FormLabel>
                                <div className="w-[50%]">

                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value.toString()}>
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
                                    <Input disabled={isLoading} placeholder='Insira um URL de uma imagem do site imgur.com' {...field} />
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
        </div>
    )
}