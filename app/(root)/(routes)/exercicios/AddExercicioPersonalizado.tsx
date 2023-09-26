'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"


const formSchema = z.object({
    nome: z.string().min(2, { message: "Mínimo de 2 letras" }).max(20, { message: "O máximo de letras é 300" }),
    descricao: z.string().min(2, { message: "Mínimo de 2 letras" }).max(300, { message: "O máximo de letras é 300" }),
    imageUrl: z.string().url({ message: 'Url inálido' }).refine((val) => val.includes('imgur.com'), { message: 'É necessário que a imagem seja do site imgur.com' }).optional().or(z.literal(''))
})

export default function AddExercicioPersonalizado({ onClose }: { onClose: () => void }) {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            descricao: "",
            nome: "",
            imageUrl: ""
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
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
                                <Input placeholder='Nome' {...field} />
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
                                <Textarea placeholder='Insira a descrição do exercício' className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
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
                                <Input placeholder='Insira um URL de uma imagem do site imgur.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />


                <div className="flex justify-around">
                    <Button variant="outline" type='submit' className="">Enviar</Button>
                    <Button onClick={(e) => { e.preventDefault(); onClose(); }}>Cancelar</Button>

                </div>
            </form>
        </Form>
    )
}