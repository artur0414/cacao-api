// Interface del repositorio de Plagas y Enfermedades que sirve como contrato para las implementaciones de los repositorios

import { PlagasEnfermedades } from "../models/PlagasEnfermedades";

export interface PlagasEnfermedadesRepositorio {
    almacenarPlagaEnfermedad(plagaEnfermedad: PlagasEnfermedades): Promise<PlagasEnfermedades>;
    obtenerPlagaEnfermedadPorId(id: string): Promise<PlagasEnfermedades | null>;
    obtenerPlagaEnfermedadPorNombreClon(nombreClon: string): Promise<PlagasEnfermedades | null>;
    actualizarPlagaEnfermedad(plagaEnfermedad: PlagasEnfermedades): Promise<PlagasEnfermedades>;
}