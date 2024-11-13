// interfaz del repositorio de usos que sirve como contrato para las implementaciones de los repositorios

import { Usos } from "../models/Usos";


export interface UsosRepositorio {
    almacenarUsos(usos: Usos): Promise<Usos>;
    obtenerUsosPorId(id: string): Promise<Usos | null>;
    obtenerUsosPorNombreClon(nombreClon: string): Promise<Usos | null>;
    actualizarUsos(usos: Usos): Promise<Usos>;
}