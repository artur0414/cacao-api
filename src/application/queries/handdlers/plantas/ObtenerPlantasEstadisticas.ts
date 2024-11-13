// Querie para obtener las estadisticas de las plantas por especie o variedad

import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { PlantaConsultasPersistencias } from "../../../../infrastructure/persistence/planta/PlantaConsultasPersistencias";
import { PlantaDTO } from "../../../dtos/planta_dto";


export class ObtenerPlantasEstadisticas {
    static async ejecutar(valores: Partial<PlantaDTO>){
        try {
            if(valores.especie) { // Si se ha especificado una especie me devuelve la cantidad de variedades por especie
                const persistencia = new PlantaConsultasPersistencias()
                const estadistica =  await persistencia.obtenerEstadisticasPlantasPorEspecie(valores.especie);
                if(estadistica === null){
                    throw new BadRequestError('No se han encontrado estadisticas para la especie especificada');
                }
                return estadistica;
            } else if(valores.variedad) { // Si se ha especificado una variedad me devuelve la cantidad de clones por variedad
                const persistencia = new PlantaConsultasPersistencias()
                const estadistica =  await persistencia.obtenerEstadisticasPlantasPorVariedad(valores.variedad);
                if(estadistica === null){
                    throw new BadRequestError('No se han encontrado estadisticas para la variedad especificada');
                }
                return estadistica;
            } else {
                throw new BadRequestError('No se ha especificado una especie o variedad para obtener las estadisticas');
            }
        } catch (error) {
            throw error;
        }
    }
}