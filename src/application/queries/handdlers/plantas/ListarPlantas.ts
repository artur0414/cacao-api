// Esta query se encarga de listar las plantas que se encuentran en la base de datos, se puede filtrar por especie, variedad o id de la planta


import { DatabaseAdapter } from "../../../../infrastructure/adapters/MySqlAdapter"; // Se importa el adaptador de base de datos
import { NotFoundError } from "../../../../infrastructure/errors/CustomErrors"; // Se importa el error personalizado NotFoundError
import { PlantaPersistencia } from "../../../../infrastructure/persistence/planta/PlantaPersistencia"; // Se importa la persistencia de la entidad Planta
import { PlantaDTO, validarParcialPlanta } from "../../../dtos/planta_dto"; // Se importa la validación de los datos de la planta



export class ListarPlantas {
    static async ejecutar({especie, variedad, id} : Partial<PlantaDTO> & {id ?:string}) {
        try {
            const plantasPersistencia = new PlantaPersistencia(new DatabaseAdapter());

            switch (true) {
                case !!especie: {
                    // Listar plantas por especie
                    const validarEspecie = validarParcialPlanta({especie: especie});
                    if(!validarEspecie.success) {
                        throw new Error(validarEspecie.error.message);
                    }
                    const planta = await plantasPersistencia.buscarPorEspecie(especie);
                    
                    if(Array.isArray(planta) && planta.length === 0) {
                        throw new NotFoundError('No se encontraron plantas con la especie proporcionada');
                    }
                    return planta;
                }
            
                case !!variedad: {
                    // Listar plantas por variedad
                    const validarVariedad = validarParcialPlanta({variedad: variedad});
                    if(!validarVariedad.success) {
                        throw new Error(validarVariedad.error.message);
                    }
                    const planta = await plantasPersistencia.buscarPorVariedad(variedad);
                    if(planta === null) {
                        throw new NotFoundError('No se encontraron plantas con la variedad proporcionada');
                    }
                    return planta;
                }
            
                case !!id: {
                    // Listar plantas por id
                    const planta = await plantasPersistencia.obtenerPlantaPorId(id);
                    if(planta === null) {
                        throw new NotFoundError('No se encontraron plantas con el id proporcionado');
                    }
                    return planta;
                }
            
                default: {
                    // Listar todas las plantas
                    return await plantasPersistencia.listarPlantas();
                }
            }
        } catch (error) {
            throw error; 
        }
    }
}

