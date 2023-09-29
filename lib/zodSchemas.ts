import * as z from 'zod'

export const exercicioFormSchema = z.object({
    nome: z.string().min(2, { message: "Mínimo de 2 letras" }).max(20, { message: "O máximo de letras é 300" }),
    descricao: z.string().min(2, { message: "Mínimo de 2 letras" }).max(300, { message: "O máximo de letras é 300" }),
    imageUrl: z.string().url({ message: 'Url inálido' }).refine((val) => val.includes('imgur.com'), { message: 'É necessário que a imagem seja do site imgur.com' }).optional().or(z.literal('')),
    dia_da_semana: z.string().refine((val) => { const valInt = parseInt(val); return valInt >= 0 && valInt <= 6; })
})