// Validar los datos de las dimensiones de un clon

import {z} from 'zod';

const dimensionesEsquema = z.object({
    nombre_clon: z.string({message: 'El nombre del clon es requerido'}).min(1, {message: 'El nombre del clon debe tener al menos 1 caracter'}).max(50, {message: 'El nombre del clon no puede tener más de 50 caracteres'}),
    altura_maxima: z.number({message: 'La altura máxima es requerida'}).min(1, {message: 'La altura máxima debe ser mayor a 0'}),
    diametro: z.number({message: 'El diámetro es requerido'}).min(1, {message: 'El diámetro debe ser mayor a 0'}),
    imagenes: z.object({
        jpg: z.string({message: 'La url del JPG es requerida'}),
        webp: z.string({message: 'La url del WEBP es requerida'}),
        tiff: z.string({message: 'La url del TIFF es requerida'})
    })
});

// Definición de los tipos de datos de las dimensiones de los clones
export type DimensionesDTO = z.infer<typeof dimensionesEsquema>;

// Validación de los datos de las dimensiones de los clones
export const validarDimensiones = (valor: DimensionesDTO) => {
    return dimensionesEsquema.safeParse(valor);
}

// Validación parcial de los datos de las dimensiones de los clones
export const validarParcialDimensiones = (valor : Partial<DimensionesDTO>) => {
    return dimensionesEsquema.partial().safeParse(valor);
}

