// Comando para crear usos o sirve como puente entre el controlador y el servicio en caso de que se requiera lógica de negocio

import { Usos } from "../../../../domain/models/Usos";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { UsosDTO, validarUsos } from "../../../dtos/usos_dto";
import { UsosServicio } from "../../../services/UsosServicio";


export class CrearUsos {
    static async ejecutar(usos: UsosDTO): Promise<Usos> {
        try {
            const resultado = validarUsos(usos);
            if(!resultado.success) {
                throw new BadRequestError(resultado.error.errors[0].message);
            }

            const usosMinuscula = usos.usos.map((uso) => uso.toLowerCase());
            const expansionGeograficaMinuscula = usos.expansion_geografica.map((expansion) => expansion.toLowerCase());

            const datos = {
                nombre_clon: usos.nombre_clon, 
                usos: usosMinuscula,
                expansion_geografica: expansionGeograficaMinuscula
            }

            return await new UsosServicio().crearUsos(datos);
        } catch (error) {
            throw error;
        }
    }
}