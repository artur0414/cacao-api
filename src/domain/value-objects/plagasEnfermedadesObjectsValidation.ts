// Valida las plagas y enfermedades que se utilizan en el modelo de PlagasEnfermedades.ts

import { z } from 'zod';

const plagasEnfermedadesEsquema = z.object({
    nombre_plaga: z.string({ message: 'El nombre de la plaga debe ser una cadena de texto' })
        .min(1, { message: 'El nombre de la plaga debe tener al menos un caracter' })
        .max(255, { message: 'El nombre de la plaga no puede tener más de 255 caracteres' }),
    asociaciones_plagas_enfermedades: z.array(
        z.object({
            nombre_plaga: z.string({ message: 'El nombre de la enfermedad debe ser una cadena de texto' })
                .min(1, { message: 'El nombre de la enfermedad debe tener al menos un caracter' })
                .max(255, { message: 'El nombre de la enfermedad no puede tener más de 255 caracteres' }),
            enfermedad_asociada: z.string({ message: 'La descripción de la enfermedad debe ser una cadena de texto' })
                .min(1, { message: 'La descripción de la enfermedad debe tener al menos un caracter' })
                .max(255, { message: 'La descripción de la enfermedad no puede tener más de 255 caracteres' }),
        })
    )
});

// Tipo de dato para las plagas y enfermedades
type PlagasEnfermedadesDTO = z.infer<typeof plagasEnfermedadesEsquema>;

//Función para validar las plagas y enfermedades
export const plagasEnfermedadesParcialValueObjectEsquema = (valor: Partial<PlagasEnfermedadesDTO>) => {
    return plagasEnfermedadesEsquema.partial().safeParse(valor);
};