// Interface del repositorio de mantenimientos que sirve como contrato para las implementaciones de los repositorios

import { Mantenimiento } from "../models/Mantenimiento";

export interface MantenimientoRepositorio {
    almacenarMantenimiento(mantenimiento: Mantenimiento): Promise<Mantenimiento>;
    obtenerMantenimientoPorNombreClon(nombreClon: string): Promise<Mantenimiento | null>;
    obtenerMantenimientoPorId(id: string): Promise<Mantenimiento | null>;
    actualizarMantenimiento(mantenimiento: Mantenimiento): Promise<Mantenimiento>;
}