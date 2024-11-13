// Interfaz para el repositorio de las caracteristicas de los clones que sirve como contrato para las implementaciones de los repositorios

import { CaracteristicaClon } from "../models/CaracteristicaClon";

export interface CaracteristicasClonRepositorio {
    almacenarCaracteristicas(caracteristicClon:CaracteristicaClon): Promise<CaracteristicaClon>;
    actualizarCaracteristicas(id: string, nombre_clon: string, caracteristicas: string[]): Promise<CaracteristicaClon>;
    obtenerCaracteristicasPorNombre(nombre: string): Promise<CaracteristicaClon | null>;
}