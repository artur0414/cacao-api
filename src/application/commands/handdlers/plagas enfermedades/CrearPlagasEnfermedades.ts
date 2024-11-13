// Crear Plagas Enfermedades Command Handler o Puente entre el controlador y el servicio en caso de que se requiera lógica de negocio adicional

import { PlagasEnfermedades } from "../../../../domain/models/PlagasEnfermedades";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { PlagasEnfermedadesDTO, validarPlagasEnfermedadesValueObjectEsquema } from "../../../dtos/PlagasEnfermedades_dto";
import { PlagasEnfermedadesServicio } from "../../../services/PlagasEnfermedadesServicio";


export class CrearPlagasEnfermedades {
    static ejecutar = async(plagasEnfermedades: PlagasEnfermedadesDTO): Promise<PlagasEnfermedades> => {
        try {
            const resultado = validarPlagasEnfermedadesValueObjectEsquema(plagasEnfermedades);
            if(!resultado.success) {
                throw new BadRequestError(resultado.error.errors[0].message);
            }
            return await new PlagasEnfermedadesServicio().crearPlagaEnfermedad(resultado.data);
        } catch (error) {
            throw error;
        }
    }
}