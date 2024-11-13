// Este esquema zod se encarga de validar los datos ingresados en la applicación para la entidad Planta. 

import {z} from 'zod';

export const plantaEsquema = z.object({
    especie: z.string({ message: 'La especie de la planta es requerida y tiene que ser un valor en cadena de texto' }).min(1, 'La especie de la planta no puede estar vacía').max(50, 'La especie de la planta no puede tener más de 50 caracteres'),
    variedad: z.string({ message: 'La variedad de la planta es requerida y tiene que ser un valor de cadena de texto' }).min(1, 'La variedad de la planta no puede estar vacía').max(50, 'La variedad de la planta no puede tener más de 50 caracteres'),
});

// Definición del tipo de dato PlantaDTO
export type PlantaDTO = z.infer<typeof plantaEsquema>;

// Funciones para validar los datos de la entidad Planta
export const validarPlanta = (planta: PlantaDTO) => {
    return plantaEsquema.safeParse(planta);
};

// Función para validar los datos parciales de la entidad Planta
export const validarParcialPlanta = (planta: Partial<PlantaDTO>) => {
    return plantaEsquema.partial().safeParse(planta);

}