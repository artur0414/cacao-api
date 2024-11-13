// Interfaz para el repositorio de las condiciones climáticas que sirve como contrato para las implementaciones de los repositorios

import { CondicionesClimaticas } from "../models/CondicionesClimaticas";

export interface CondicionesClimaticasRepositorio {
    almacenarCondicionesClimaticas(condicionesClimaticas: CondicionesClimaticas): Promise<CondicionesClimaticas>; 
    obtenerCondicionesClimaticasPorNombreClon(nombreClon: string): Promise<CondicionesClimaticas | null>;
    obtenerCondicionesClimaticasPorId(id:string): Promise<CondicionesClimaticas | null>; 
    actualizarCondicionesClimaticas(condicionesClimaticas: CondicionesClimaticas): Promise<CondicionesClimaticas>; 
}