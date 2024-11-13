// Servicio de caracteristicas de clones que se encarga de crear una caracteristica de clon o actualizarla si ya existe.

import { CaracteristicaClon } from "../../domain/models/CaracteristicaClon";
import { DatabaseAdapter } from "../../infrastructure/adapters/MySqlAdapter";
import { CaracteristicasClonEntity } from "../../infrastructure/entities/CaracteristicaClonEntity";
import { CaracteristicasClonPersistencia } from "../../infrastructure/persistence/caracteristicasClon/CaracteristicaPersistencia";
import { CaracteristicasClonDTO } from "../dtos/caracteristicasClon_dto";

export class CaracteristicasServicio {

    private persistencia : CaracteristicasClonPersistencia;

    constructor() {
        this.persistencia = new CaracteristicasClonPersistencia(new DatabaseAdapter());
    }

    // Método para crear caracteristicas de clones o actualizarlas si ya existen

    async crearCaracteristicas(caracteristica: CaracteristicasClonDTO): Promise<CaracteristicaClon> {
        try {

            const caracteristicasExistentes = await this.persistencia.obtenerCaracteristicasPorNombre(caracteristica.nombre_clon);
            // Si no existen las características, se crean
            if(caracteristicasExistentes === null) {
                const caracteristicaCloEntidad = new CaracteristicasClonEntity(caracteristica.nombre_clon, caracteristica.caracteristicas);
                const caracteristicasClon = new CaracteristicaClon(caracteristicaCloEntidad.obtenerNombreClon(), caracteristicaCloEntidad.obtenerCaracteristicasClon());

                return await this.persistencia.almacenarCaracteristicas(caracteristicasClon);
            // Si existen, se actualizan
            } else {
                caracteristicasExistentes.actualizarCaracteristica(caracteristica.caracteristicas);
                const caracteristicas =  await this.persistencia.actualizarCaracteristicas(caracteristicasExistentes.obtenerId()!, 
                caracteristicasExistentes.obtenerNombreClon(), caracteristicasExistentes.obtenerCaracteristicas());
                return caracteristicas;
            }
        } catch (error) {
            throw error;
        }
    }
}