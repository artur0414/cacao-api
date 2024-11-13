// Validación de los datos de las plagas y enfermedades asociadas a un clon

import {z} from 'zod';

const plagasEnfermedadesEsquema = z.object({
    nombre_clon: z.string({message: 'El nombre del clon debe ser una cadena de texto'}).min(1, {message: 'El nombre del clon debe tener al menos un caracter'}).max(50, {message: 'El nombre del clon no puede tener más de 50 caracteres'}),
    asociaciones_plagas_enfermedades: z.array(
        z.object({
            nombre_plaga: z.string({message: 'El nombre de la plaga debe ser una cadena de texto'}).min(1, {message: 'El nombre de la plaga debe tener al menos un caracter'}).max(255, {message: 'El nombre de la plaga no puede tener más de 255 caracteres'}),
            enfermedad_asociada: z.string({message: 'La enfermedad asociada debe ser una cadena de texto'}).min(1, {message: 'La enfermedad asociada debe tener al menos un caracter'}).max(255, {message: 'La enfermedad asociada no puede tener más de 255 caracteres'}),
        })
    ).min(1, {message: 'Debe haber al menos una plaga/enfermedad asociada al clon'})
})


// Definición de los tipos de datos de las plagas y enfermedades asociadas a un clon
export type PlagasEnfermedadesDTO = z.infer<typeof plagasEnfermedadesEsquema>;

// Validación de los datos de las plagas y enfermedades asociadas a un clon
export const ValidarPlagasEnfermedadesParcialValueObjectEsquema = (valor: Partial<PlagasEnfermedadesDTO>) => {
    return plagasEnfermedadesEsquema.partial().safeParse(valor);
}

// Validación parcial de los datos de las plagas y enfermedades asociadas a un clon
export const validarPlagasEnfermedadesValueObjectEsquema = (valor: PlagasEnfermedadesDTO) => {
    return plagasEnfermedadesEsquema.safeParse(valor);
}