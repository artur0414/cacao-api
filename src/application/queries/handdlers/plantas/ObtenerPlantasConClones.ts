//Query para obtener las plantas con sus clones, también se puede obtener las plantas con sus clones filtrando por especie, variedad o nombre de la planta.

import { NotFoundError } from "../../../../infrastructure/errors/CustomErrors";
import { PlantaConsultasPersistencias } from "../../../../infrastructure/persistence/planta/PlantaConsultasPersistencias";
import { PlantaDTO } from "../../../dtos/planta_dto";

export class ObtenerPlantasConClones {

    static async ejecutar(valores: Partial<PlantaDTO> & {nombre_clon?: string}) {
        try {
            if (valores.variedad) {
                const plantaConsultasPersistencias = new PlantaConsultasPersistencias();
                const plantasConClones = await plantaConsultasPersistencias.obtenerPlantasConClonesPorVariedad(valores.variedad);
                if(plantasConClones === null){
                    throw new NotFoundError('No se encontraron plantas con la variedad especificada');
                }
                return plantasConClones;
            }

            if (valores.especie) {
                const plantaConsultasPersistencias = new PlantaConsultasPersistencias();
                const plantasConClones = await plantaConsultasPersistencias.obtenerPlantasConClonesPorEspecie(valores.especie);
                if(plantasConClones === null){
                    throw new NotFoundError('No se encontraron plantas con la especie especificada');
                }
                return plantasConClones;
            }

            if(valores.nombre_clon){
                const plantaConsultasPersistencias = new PlantaConsultasPersistencias();
                const plantasConClones = await plantaConsultasPersistencias.obtenerPlantasConClonesPorNombre(valores.nombre_clon);
                if(plantasConClones === null){
                    throw new NotFoundError('No se encontraron plantas con el clon especificado');
                }
                return plantasConClones;
            }

            const plantaConsultasPersistencias = new PlantaConsultasPersistencias();
            const plantasConClones = await plantaConsultasPersistencias.obtenerPlantasConClones();
            if(plantasConClones === null){
                throw new NotFoundError('No se encontraron plantas con clones');
            }
            return plantasConClones;
        }
        catch (error) {
            throw error
        }
    }

}