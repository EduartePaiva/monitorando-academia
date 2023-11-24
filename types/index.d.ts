import { Categoria, Exercicio } from "@prisma/client";

//exercicios get é um arrei deste
export interface exercicioGet {
    id: bigint;
    imagem_url: string | null;
    nome: string;
    dia_da_semana: number;
    descricao: string;
    categoriaId: bigint | null;
}

export type SafeExercicio = Omit<
    Exercicio,
    "id" | "categoriaId" | "updatedAt" | "createdAt" | "userId"
> & {
    id: string;
    categoriaId: string | undefined;
}

export type SafeCategoria = Omit<
    Categoria,
    "id" | "userId"
> & {
    id: string;
}
export type SafeCategoriaComExercicios = {
    id: string;
    nome: string;
    descricao: string;
    exercicios: {
        id: string;
        nome: string;
    }[];
}

export interface Serie {
    reps: number,
    carga: number
}

export interface RegistreDiaDados {
    id: string
    userId: string
    exercicioId: string
    numeroDeSeries: number;
    series: Serie[]
    //nesta parte eu vou utilizar json.stringfy para salvar series em json.
}

export interface ScoreReturn {
    label: string
    data: number
}