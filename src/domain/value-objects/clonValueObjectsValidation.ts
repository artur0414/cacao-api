// Validación de los value objects de los clones para el Dominio de la aplicación

import {z} from 'zod';

const clonEsquema = z.object({
    id: z.string({ message: 'El id del clon es requerido' }).min(1, 'El id del clon no puede estar vacío').max(50, 'El id del clon no puede tener más de 50 caracteres'),
    variedad: z.string({ message: 'La variedad del clon es requerida' }).min(1, 'La variedad del clon no puede estar vacía').max(50, 'La variedad del clon no puede tener más de 50 caracteres'),
    nombre_clon: z.string({ message: 'El nombre del clon es requerido' }).min(1, 'El nombre del clon no puede estar vacío').max(50, 'El nombre del clon no puede tener más de 50 caracteres'),
    origen: z.string({ message: 'El origen del clon es requerido' }).min(1, 'El origen del clon no puede estar vacío').max(50, 'El origen del clon no puede tener más de 50 caracteres'),
    descripcion: z.string({ message: 'La descripción del clon es requerida' }).min(1, 'La descripción del clon no puede estar vacía').max(500, 'La descripción del clon no puede tener más de 500 caracteres'),
});

//Validar el value object de un clon parcialmente
export const validarParcialValueObjectClon = (clon: string) => {
    return clonEsquema.partial().safeParse(clon);
}