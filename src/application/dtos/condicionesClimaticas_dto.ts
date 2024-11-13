// Define y exporta el esquema de validación de las condiciones climáticas

import {z} from 'zod';

export const condicionesClimaticasEsquema = z.object({
    nombre_clon: z.string({ message: 'El nombre del clon es requerido y tiene que ser un valor en cadena de texto' }).min(1, 'El nombre del clon no puede estar vacío').max(50, 'El nombre del clon no puede tener más de 50 caracteres'),
    rango_altitudinal: z.string({ message: 'El rango altitudinal es requerido y tiene que ser un valor de cadena de texto' }).min(1, 'El rango altitudinal no puede estar vacío').max(50, 'El rango altitudinal no puede tener más de 50 caracteres'),
    rango_luminosidad: z.string({ message: 'El rango de luminosidad es requerido y tiene que ser un valor de cadena de texto' }).min(1, 'El rango de luminosidad no puede estar vacío').max(50, 'El rango de luminosidad no puede tener más de 50 caracteres'),
    temperatura: z.string({ message: 'La temperatura es requerida y tiene que ser un valor numérico' }).min(0, 'La temperatura no puede ser menor a 0'),
    precipitacion: z.string({ message: 'La precipitación es requerida y tiene que ser un valor numérico' }).min(0, 'La precipitación no puede ser menor a 0'),
    humedad_relativa: z.string({ message: 'La humedad relativa es requerida y tiene que ser un valor numérico' }).min(0, 'La humedad relativa no puede ser menor a 0'),
});

// Define el tipo de las condiciones climáticas
export type CondicionesClimaticasDTO = z.infer<typeof condicionesClimaticasEsquema>;


// Exporta las funciones de validación de las condiciones climáticas
export const validarCondicionesClimaticas = (condicionesClimaticas: CondicionesClimaticasDTO) => {
    return condicionesClimaticasEsquema.safeParse(condicionesClimaticas);
};

// Exporta las funciones de validación de las condiciones climáticas parciales
export const validarParcialCondicionesClimaticas = (condicionesClimaticas: Partial<CondicionesClimaticasDTO>) => {
    return condicionesClimaticasEsquema.partial().safeParse(condicionesClimaticas);
}