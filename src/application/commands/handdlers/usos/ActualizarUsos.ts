// Comando para actualizar usos o sirve como puente entre el controlador y el servicio en caso de que se requiera lógica de negocio

import { Usos } from "../../../../domain/models/Usos";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { UsosDTO, validarParcialUsos } from "../../../dtos/usos_dto";
import { UsosServicio } from "../../../services/UsosServicio";


export class ActualizarUsos {
    static async ejecutar(usos: Partial<UsosDTO> & { id: string }): Promise<Usos> {
        try {
            const validarUsos = validarParcialUsos(usos)
            if(!validarUsos.success){
                throw new BadRequestError(validarUsos.error.errors[0].message)
            }

            const usosMinuscula = usos.usos && usos.usos.map((uso) => uso.toLowerCase());
            const expansionGeograficaMinuscula = usos.expansion_geografica && usos.expansion_geografica.map((expansion) => expansion.toLowerCase());

            const datos = {
                nombre_clon: usos.nombre_clon, 
                usos: usos.usos && usosMinuscula,
                expansion_geografica: usos.expansion_geografica && expansionGeograficaMinuscula,
                id: usos.id
            }

            return await new UsosServicio().actualizarUsos(datos);
        } catch (error) {
            throw error
        }
    }
}