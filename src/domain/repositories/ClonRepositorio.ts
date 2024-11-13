//Interfaz para la firma de los métodos de la base de datos de clones

import {Clon} from "../models/Clon";

export interface ClonRepositorio {
    almacenarClon(clon: Clon): Promise<Clon>;
    buscarClonPorNombre(nombre: string): Promise<Clon | null>;
    obtenerClonPorId(id: string): Promise<Clon | null>;
    eliminarClon(id: string): Promise<void>;
    actualizarClon(clon: Clon): Promise<Clon>;
    listarClones(): Promise<Clon[] | null>;
    buscarClonesPorVariedad(variedad: string): Promise<Clon[] | null>;
}