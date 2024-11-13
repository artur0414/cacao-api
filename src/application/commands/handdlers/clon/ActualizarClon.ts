//Comando para la actualización de un clon o puente entre el controlador y el servicio en caso de que se requiera una acción adicional a la de la actualización de un clon


import { Clon } from "../../../../domain/models/Clon";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { ClonDTO, validarParcialClon } from "../../../dtos/clon_dto";
import { ClonServicio } from "../../../services/ClonServicio";


export class ActualizarClon {
    static async ejecutar(datos: Partial<ClonDTO> & {id:string}): Promise<Clon> {
        try {
            const clonDatos = validarParcialClon(datos);
            if (!clonDatos.success) {
                throw new BadRequestError(clonDatos.error.errors[0].message);
            }

            return new ClonServicio().actualizarClon(datos);

        } catch (error) {
            throw error;
        }
    }
}