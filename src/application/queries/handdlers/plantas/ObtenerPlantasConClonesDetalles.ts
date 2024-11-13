// Queries que se encargan de obtener las plantas con clones de la base de datos 

import { NotFoundError } from "../../../../infrastructure/errors/CustomErrors";
import { PlantaDetallesConsultas } from "../../../../infrastructure/persistence/planta/PlantaDetallesConsultas";

interface PlantaConClones {
    variedad ?: string
    especie ?: string
    nombre_clon ?: string
    usos ?: string
    page ?: number
    expogeo ?: string
    limit ?: number
    caracteristica?: string
}

export class ObtenerPlantasConClonesDetalles {

    static async ejecutar(valores: PlantaConClones, persistencia: PlantaDetallesConsultas) {

        if(valores.page) valores.page = parseInt(valores.page.toString());
        if(valores.limit) valores.limit = parseInt(valores.limit.toString());

        try {
            let plantasConClones;

            switch (true) { 
                case !!valores.nombre_clon: // Si se especifica el nombre del clon
                    plantasConClones = await persistencia.obtenerPlantasConClonesPorNombreClon(valores.nombre_clon);
                    if (plantasConClones === null) {
                        throw new NotFoundError('No se encontraron plantas con el clon especificado');
                    }
                    break;
                case !!valores.variedad: // Si se especifica la variedad
                    plantasConClones = await persistencia.obtenerPlantasConClonesPorVariedad(
                        valores.variedad, valores.page, valores.limit
                    );
                    if (plantasConClones === null) {
                        throw new NotFoundError('No se encontraron plantas con la variedad especificada');
                    }
                    break;
                case !!valores.especie: // Si se especifica la especie
                    plantasConClones = await persistencia.obtenerPlantasConClonesPorEspecie(valores.especie);
                    if (plantasConClones === null) {
                        throw new NotFoundError('No se encontraron plantas con la especie especificada');
                    }
                    break;
                case !!valores.caracteristica: // Si se especifica la caracteristica
                    plantasConClones = await persistencia.obtenerPlantasConClonesPorCaracteristicas(valores.caracteristica.toLowerCase());
                    if (plantasConClones === null) {
                        throw new NotFoundError('No se encontraron plantas con la caracteristica especificada');
                    }
                    break;
                case !!valores.usos: // Si se especifica el uso
                    plantasConClones = await persistencia.obtenerPlantasConClonesPorUsos(valores.usos.toLowerCase());
                    if (plantasConClones === null) {
                        throw new NotFoundError('No se encontraron plantas con el uso especificado');
                    }
                    break;
                case !!valores.expogeo: // Si se especifica la exposición geográfica
                    plantasConClones = await persistencia.obtenerPlantasConClonesPorExpGeo(valores.expogeo.toLowerCase());
                    if (plantasConClones === null) {
                        throw new NotFoundError('No se encontraron plantas con el uso especificado');
                    }
                    break;
                default: /// Si no se especifica ningún parámetro
                    plantasConClones = await persistencia.obtenerPlantasConClones(valores.page, valores.limit);
                    if (plantasConClones === null) {
                        throw new NotFoundError('No se encontraron plantas con clones');
                    }
                    break;
            }

            return plantasConClones;

        }
        catch (error) {
            throw error
        }
    }
}