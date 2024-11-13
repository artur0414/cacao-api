// Validación de los datos de las caracteristicas de los clones

import { z } from 'zod';

const caracteristicasClonEsquema = z.object({
    nombre_clon: z.string({ message: 'El nombre del clon es requerido' })
        .min(1, { message: 'El nombre del clon debe tener al menos 1 caracter' })
        .max(50, { message: 'El nombre del clon no puede tener más de 50 caracteres' }),
    caracteristicas: z.array(z.string().min(1, { message: 'Cada característica debe tener al menos 1 caracter' })
        .max(50, { message: 'Cada característica no puede tener más de 50 caracteres' }))
        .min(1, { message: 'Debe haber al menos una característica' }),
});

// Definición de los tipos de datos de las caracteristicas de los clones

export type CaracteristicasClonDTO = z.infer<typeof caracteristicasClonEsquema>;

// Validación de los datos de las caracteristicas de los clones

export const validarCaracteristicasClon = (caracteristicasClon: any) => {
    return caracteristicasClonEsquema.safeParse(caracteristicasClon);
};

// Validación parcial de los datos de las caracteristicas de los clones

export const validarCaracteristicasClonParcial = (caracteristicasClon: any) => {
    return caracteristicasClonEsquema.partial().safeParse(caracteristicasClon);
};
