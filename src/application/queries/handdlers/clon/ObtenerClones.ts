// Query para obtener clones con detalles, se recibe un DTO con los parametros de busqueda y se retorna un arreglo con los clones encontrados

import { NotFoundError } from "../../../../infrastructure/errors/CustomErrors"
import { ClonesConsultasPersistencia } from "../../../../infrastructure/persistence/clon/ClonesConsultasPersistencia"

interface ObtenerClonesDTO {
    variedad ?: string
    nombre_clon ?: string
    caracteristica ?: string
    uso ?: string
    page ?: number
    limit ?: number
    expogeo ?: string
}

export class ObtenerClonesConDetalles {
    // se agrega parametro persistencia de tipo ClonesConsultasPersistencia para poder acceder a los metodos de la clase sin necesidad de instanciarla en la clase, y utilizarla por medio de la inyeccion de dependencias
    static async ejecutar(valores: ObtenerClonesDTO, persistencia: ClonesConsultasPersistencia) {

        if(valores.page) valores.page = parseInt(valores.page.toString());
        if(valores.limit) valores.limit = parseInt(valores.limit.toString());

        try {
            
            let clonesConDetalles;

            switch(true) {
                case !!valores.nombre_clon:
                    clonesConDetalles = await persistencia.obtenerClonesConDetallesPorNombreClon(valores.nombre_clon);
                    if(clonesConDetalles === null) {
                        throw new NotFoundError('No se encontraron clones con el nombre especificado');
                    }
                    break;
                case !!valores.variedad:
                    clonesConDetalles = await persistencia.obtenerClonesConDetallesPorVariedad(valores.variedad);
                    if(clonesConDetalles === null) {
                        throw new NotFoundError('No se encontraron clones con la variedad especificada');
                    }
                    break;
                case !!valores.caracteristica:
                    clonesConDetalles = await persistencia.obtenerClonesConDetallesPorCaracteristicas(valores.caracteristica.toLowerCase());
                    if(clonesConDetalles === null) {
                        throw new NotFoundError('No se encontraron clones con las caracteristicas especificadas');
                    }
                    break;
                case !!valores.uso:
                    clonesConDetalles = await persistencia.obtenerClonesConDetallesPorUsos(valores.uso.toLowerCase());
                    if(clonesConDetalles === null) {
                        throw new NotFoundError('No se encontraron clones con el uso especificado');
                    }
                    break;
                case !!valores.expogeo:
                    clonesConDetalles = await persistencia.obtenerClonesConDetallesPorExposicionGeografica(valores.expogeo);
                    if(clonesConDetalles === null) {
                        throw new NotFoundError('No se encontraron clones con la exposición geográfica especificada');
                    }
                    break;
                default:
                    clonesConDetalles = await persistencia.obtenerClonesConDetalles(valores.page, valores.limit);
                    if(clonesConDetalles === null) {
                        throw new NotFoundError('No se encontraron clones con detalles');
                    }
                    break;  
            }

            return clonesConDetalles;
            
        } catch (error) {
            throw error
        }
    }
}