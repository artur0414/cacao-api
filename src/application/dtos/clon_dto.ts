// Validación de los datos de entrada para el clon
import {z} from 'zod';

// Esquema de validación para el clon
const ClonEsquema = z.object({
    variedad: z.string({message: 'La variedad ser una cadena de texto'}).min(1, {message: 'La variedad es requerida'}).max(50, {message: 'La variedad no puede ser mayor a 50 caracteres'}),
    nombre_clon: z.string({message: 'El nombre del clon debe ser una cadena de texto'}).min(1, {message: 'El nombre del clon es requerido'}).max(50, {message: 'El nombre del clon no puede ser mayor a 50 caracteres'}),
    origen: z.string({message: 'El origen debe ser una cadena de texto'}).min(1, {message: 'El origen es requerido'}).max(50, {message: 'El origen no puede ser mayor a 50 caracteres'}),
    descripcion: z.string({message: 'La descripción debe ser una cadena de texto'}).min(1, {message: 'La descripción es requerida'}).max(500, {message: 'La descripción no puede ser mayor a 500 caracteres'}),
});

// Tipo de dato para el clon

export type ClonDTO = z.infer<typeof ClonEsquema>;

// Función para validar un clon

export const validarClon = (clon: ClonDTO) => {
    return ClonEsquema.safeParse(clon);
}

// Función para validar un clon parcial

export const validarParcialClon = (clon: Partial<ClonDTO>) => {
    return ClonEsquema.partial().safeParse(clon);
}