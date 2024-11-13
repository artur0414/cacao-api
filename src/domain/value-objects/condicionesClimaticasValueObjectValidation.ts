// Valida las condiciones climáticas que se utilizan en el modelo de CondicionesClimaticas.ts

import {z} from 'zod';

const condicionesClimaticasEsquema = z.object({
    rango_altitudinal: z.string({message: 'El rango altitudinal tiene que ser una cadena de texto'}).min(1, {message: 'El rango altitudinal es requerido'}).max(255, {message: 'El rango altitudinal no puede superar los 255 caracteres'}),
    rango_luminosidad: z.string({message: 'El rango iluminacidad tiene que ser una cadena de texto'}).min(1, {message: 'El rango iluminacidad es requerido'}).max(255, {message: 'El rango iluminacidad no puede superar los 255 caracteres'}),
    temperatura: z.string({message: 'La temperatura tiene que ser una cadena de texto'}).min(1, {message: 'La temperatura es requerida'}).max(255, {message: 'La temperatura no puede superar los 255 caracteres'}),
    precipitacion: z.string({message: 'La precipitación tiene que ser una cadena de texto'}).min(1, {message: 'La precipitación es requerida'}).max(255, {message: 'La precipitación no puede superar los 255 caracteres'}),
    humedad_relativa: z.string({message: 'La humedad relativa tiene que ser una cadena de texto'}).min(1, {message: 'La humedad relativa es requerida'}).max(255, {message: 'La humedad relativa no puede superar los 255 caracteres'}),
    id: z.string({message: 'El id es requerido'}).min(1, {message: 'El es Requerido'}).max(50, {message: 'El id no puede superar los 255 caracteres'}),
});


//Función para validar las condiciones climáticas
export const condicionesClimaticasParcialValueObjectEsquema = (valor: string) => {   
    return condicionesClimaticasEsquema.partial().safeParse(valor);
}