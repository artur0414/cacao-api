// Comando para actualizar un mantenimiento o se usa como puente entre el controlador y el servicio en caso de que se requiera lógica de negocio adicional

import { Mantenimiento } from "../../../../domain/models/Mantenimiento";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { MantenimientoDTO, validarParcialMantenimiento } from "../../../dtos/mantenimiento_dto";
import { MantenimientoServicio } from "../../../services/MantenimientoServicio";


export class ActualizarMantenimiento {
    static async ejecutar(mantenimiento: Partial<MantenimientoDTO> & { id: string }): Promise<Mantenimiento> {
        try {
            const validarMantenimiento = validarParcialMantenimiento(mantenimiento);
            if(!validarMantenimiento.success){
                throw new BadRequestError(validarMantenimiento.error.errors[0].message)
            }
            return await new MantenimientoServicio().actualizarMantenimiento(mantenimiento);
        } catch (error) {
            throw error;
        }
    }
}