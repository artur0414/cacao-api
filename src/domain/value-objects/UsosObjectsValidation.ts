// Valida los usos que se utilizan en el modelo de Usos.ts

import {z} from 'zod'

const usosEsquema = z.object({
    usos: z.array(z.string({message: 'El uso debe ser una cadena de texto'})).min(1, {message: 'Debe haber al menos un uso'}),
    expansion_geografica: z.array(z.string({message: 'La expansión geográfica debe ser una cadena de texto'})).min(1, {message: 'Debe haber al menos una expansión geográfica'})
})

// Tipo de dato para los usos
export type UsosDTO = z.infer<typeof usosEsquema>

//Función para validar los usos
export const usosParcialValueObjectEsquema = (valor: Partial<UsosDTO>) => {
    return usosEsquema.partial().safeParse(valor)
}