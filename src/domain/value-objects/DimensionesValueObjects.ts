// Valida las dimensiones que se utilizan en el modelo de Dimensiones.ts

import {z} from 'zod';

const dimensionesEsquema = z.object({
    nombre_clon: z.string({message: 'El nombre del clon tiene que ser una cadena de texto'}).min(1, {message: 'El nombre del clon es requerido'}).max(255, {message: 'El nombre del clon no puede superar los 255 caracteres'}),
    altura_maxima: z.number({message: 'La altura máxima es requerida'}).min(1, {message: 'La altura máxima debe ser mayor a 0'}),
    diametro: z.number({message: 'El diámetro es requerido'}).min(1, {message: 'El diámetro debe ser mayor a 0'}),
    imagenes: z.object({
        jpg: z.string({message: 'La url del JPG es requerida'}),
        webp: z.string({message: 'La url del WEBP es requerida'}),
        tiff: z.string({message: 'La url del TIFF es requerida'})
    }),
    id: z.string({message: 'El id es requerido'}).min(1, {message: 'El es Requerido'}).max(50, {message: 'El id no puede superar los 255 caracteres'}),
});

//Tipo de dato para las dimensiones
type Dimensiones = z.infer<typeof dimensionesEsquema>;

//Función para validar las dimensiones
export const validarDimensionesParcialValueObjectEsquema = (valor: Partial<Dimensiones>) => {
    return dimensionesEsquema.partial().safeParse(valor);
}
