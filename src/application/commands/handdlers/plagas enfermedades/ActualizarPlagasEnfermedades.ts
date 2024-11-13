// Comando para actualizar una plaga o enfermedad o se utiliza como puente entre el controlador y el servicio en caso de que se requiera lógica de negocio adicional

import { PlagasEnfermedades } from "../../../../domain/models/PlagasEnfermedades";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { PlagasEnfermedadesDTO, ValidarPlagasEnfermedadesParcialValueObjectEsquema } from "../../../dtos/PlagasEnfermedades_dto";
import { PlagasEnfermedadesServicio } from "../../../services/PlagasEnfermedadesServicio";


export class ActualizarPlagasEnfermedades {
    static async ejecutar(plagasEnfermedades: Partial<PlagasEnfermedadesDTO> & { id: string }): Promise<PlagasEnfermedades> {
       try {
            const validarPlagasEnfermedades = ValidarPlagasEnfermedadesParcialValueObjectEsquema(plagasEnfermedades);
            if(!validarPlagasEnfermedades.success){
                throw new BadRequestError(validarPlagasEnfermedades.error.errors[0].message)
            }

            return await new PlagasEnfermedadesServicio().actualizarPlagasEnfermedades(plagasEnfermedades);
       } catch (error) {
            throw error;
       }
    }
}