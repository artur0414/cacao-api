// Validar los datos de los mantenimientos de un clon

import {z} from 'zod';

export const mantenimientoEsquema = z.object({
    nombre_clon: z.string({message: 'El nombre del clon es requerido y tiene que ser un valor en cadena de texto'}).min(1, {message: 'El nombre del clon no puede estar vacío'}).max(50, {message: 'El nombre del clon no puede tener más de 50 caracteres'}),
    tipo_abonos: z.array(z.string({message: 'El tipo de abono debe ser una cadena de texto'}).min(1, {message: 'El tipo de abono debe tener al menos un caracter'})).nonempty({message: 'El tipo de abono no puede estar vacío'}),
    frecuencia_podas: z.string({message: 'La frecuencia de podas debe ser una cadena de texto'}).min(1, {message: 'La frecuencia de podas debe tener al menos un caracter'}).max(255, {message: 'La frecuencia de podas no puede tener más de 255 caracteres'}),
})


// Definición de los tipos de datos de los mantenimientos de los clones
export type MantenimientoDTO = z.infer<typeof mantenimientoEsquema>;

// Validación de los datos de los mantenimientos de los clones
export const validarMantenimiento = (mantenimiento: MantenimientoDTO) => {
    return mantenimientoEsquema.safeParse(mantenimiento);
};

// Validación parcial de los datos de los mantenimientos de los clones
export const validarParcialMantenimiento = (mantenimiento: Partial<MantenimientoDTO>) => {
    return mantenimientoEsquema.partial().safeParse(mantenimiento);
}
