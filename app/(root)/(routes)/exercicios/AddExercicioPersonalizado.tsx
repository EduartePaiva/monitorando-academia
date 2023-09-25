'use client'

import { Form, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const formSchema = z.object({
    nome: z.string().min(2, { message: "Mínimo de 2 letras" }).max(20, { message: "O máximo de letras é 300" }),
    descricao: z.string().min(2, { message: "Mínimo de 2 letras" }).max(300, { message: "O máximo de letras é 300" })
})

export default function AddExercicioPersonalizado() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            descricao: "",
            nome: ""
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='nome'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do exercício:</FormLabel>
                            <FormControl>
                                <Input placeholder='Nome' {...field} />
                            </FormControl>
                            <FormDescription>Ok</FormDescription>
                            <FormMessage />

                        </FormItem>
                    )}
                />
                <Button type='submit'>Enviar</Button>
            </form>
        </Form>
    )
}