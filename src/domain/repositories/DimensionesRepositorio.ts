// Interfaz para el repositorio de las dimensiones que sirve como contrato para las implementaciones de los repositorios

import { Dimensiones } from "../models/Dimensiones";

export interface DimensionesRepositorio {
    almacenarDimensiones(dimensiones: Dimensiones): Promise<Dimensiones>;
    obtenerDimensionesPorNombreClon(nombre_clon: string): Promise<Dimensiones | null>;
    obtenerDimensionesPorId(id: string): Promise<Dimensiones | null>;
    actualizarDimensiones(dimensiones: Dimensiones): Promise<Dimensiones>;
}