// Queries para listar clones por nombre_clon, variedad o todos los clones

import { DatabaseAdapter } from "../../../../infrastructure/adapters/MySqlAdapter";
import { BadRequestError, NotFoundError } from "../../../../infrastructure/errors/CustomErrors";
import { ClonPersistencia } from "../../../../infrastructure/persistence/clon/ClonPersistencia";
import { validarParcialClon } from "../../../dtos/clon_dto";

export class ListarClones {
    static async ejecutar({nombre_clon, variedad} : {nombre_clon?: string, variedad?: string}) {
        try {
            const clonPersistencia = new ClonPersistencia(new DatabaseAdapter());

            // Listar clones por nombre_clon
            if (nombre_clon) {
                const validarNombreClon = validarParcialClon({nombre_clon: nombre_clon});
                if(!validarNombreClon.success) {
                    throw new BadRequestError(validarNombreClon.error.errors[0].message);
                }
                const clon = await clonPersistencia.buscarClonPorNombre(nombre_clon);

                if(clon === null) {
                    throw new NotFoundError('No se encontraron clones con el nombre_clon proporcionado');
                }
                
                if(Array.isArray(clon) && clon.length === 0) {
                    throw new NotFoundError('No se encontraron clones con el nombre_clon proporcionado');
                }
                return clon
            } else if (variedad) { // Listar clones por variedad
                const validarVariedad = validarParcialClon({variedad: variedad});
                if(!validarVariedad.success) {
                    throw new BadRequestError(validarVariedad.error.errors[0].message);
                }
                const clon = await clonPersistencia.buscarClonesPorVariedad(variedad);
                
                if(clon === null) {
                    throw new NotFoundError('No se encontraron clones con la variedad proporcionada');
                }

                return clon
            } else { // Listar todos los clones
                return await clonPersistencia.listarClones();
            }
        } catch (error) {
            throw error; 
        }
    }
}