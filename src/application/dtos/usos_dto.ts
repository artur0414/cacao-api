// Validación de los datos de los usos de los clones

import {z} from 'zod';

const usosEsquema = z.object({
    nombre_clon: z.string({message: 'El nombre del clon debe ser una cadena de texto'}).min(1, {message: 'El nombre del clon no puede estar vacío'}).max(50, {message: 'El nombre del clon no puede tener más de 50 caracteres'}),
    usos: z.array(z.string({message: 'El uso debe ser una cadena de texto'})).min(1, {message: 'Debe haber al menos un uso'}),
    expansion_geografica: z.array(z.string({message: 'La expansión geográfica debe ser una cadena de texto'})).min(1, {message: 'Debe haber al menos una expansión geográfica'})
})

// Definición de los tipos de datos de los usos de los clones
export type UsosDTO = z.infer<typeof usosEsquema>


// Validación parcial de los datos de los usos de los clones
export const validarParcialUsos = (valor: Partial<UsosDTO>) => {
    return usosEsquema.partial().safeParse(valor)
}


// Validación de los datos de los usos de los clones
export const validarUsos = (valor: UsosDTO) => {
    return usosEsquema.safeParse(valor)
}