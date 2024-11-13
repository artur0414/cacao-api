// Validar la característica del clon que se utilizan en el modelo de CondicionesClimaticas.ts

import {z} from 'zod';

const caracteristicaClonEsquema = z.string({ message: 'La característica del clon es requerida' }).min(1, 'La característica del clon no puede estar vacía').max(500, 'La característica del clon no puede tener más de 50 caracteres').optional();

export const validarCaracteristicaClon = (caracteristica: string) => {
    return caracteristicaClonEsquema.safeParse(caracteristica);
}