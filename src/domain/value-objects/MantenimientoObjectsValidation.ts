// Valida los mantenimientos que se utilizan en el modelo de Mantenimientos.ts

import {z} from 'zod';

const mantenimientoEsquema = z.object({
    tipo_abonos: z.array(z.string({message: 'El tipo de abono debe ser una cadena de texto'}).min(1, {message: 'El tipo de abono debe tener al menos un caracter'})).nonempty({message: 'El tipo de abono no puede estar vacío'}),
    frecuencia_podas: z.string({message: 'La frecuencia de podas debe ser una cadena de texto'}).min(1, {message: 'La frecuencia de podas debe tener al menos un caracter'}).max(255, {message: 'La frecuencia de podas no puede tener más de 255 caracteres'}),
    id : z.string({message: 'El id debe ser una cadena de texto'}).min(1, {message: 'El id debe tener al menos un caracter'}).max(50, {message: 'El id no puede tener más de 255 caracteres'}),
})

// Tipo de dato para los mantenimientos
type MantenimientoDTO = z.infer<typeof mantenimientoEsquema>;

//Función para validar los mantenimientos
export const mantenimientoParcialValueObjectEsquema = (valor: Partial<MantenimientoDTO>) => {
    return mantenimientoEsquema.partial().safeParse(valor);
}
