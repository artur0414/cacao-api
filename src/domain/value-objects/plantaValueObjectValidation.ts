// Valida las plantas que se utilizan en el modelo de Planta.ts

import {z} from 'zod';

const plantaEsquema = z.object({
    especie: z.string({ message: 'La especie de la planta es requerida' }).min(1, 'La especie de la planta no puede estar vacía').max(50, 'La especie de la planta no puede tener más de 50 caracteres').optional(),
    variedad: z.string({ message: 'La variedad de la planta es requerida' }).min(1, 'La variedad de la planta no puede estar vacía').max(50, 'La variedad de la planta no puede tener más de 50 caracteres'),
    id: z.string(),
});


// Función para validar las plantas
export const validarParcialValueObjectPlanta = (valor: string) => {
    return plantaEsquema.partial().safeParse(valor);
}