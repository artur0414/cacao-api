// Comando para crear un mantenimiento o se usa como puente entre el controlador y el servicio si se requiere lógica de negocio

import { Mantenimiento } from "../../../../domain/models/Mantenimiento";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { MantenimientoDTO, validarMantenimiento } from "../../../dtos/mantenimiento_dto";
import { MantenimientoServicio } from "../../../services/MantenimientoServicio";


export class CrearMantenimiento {
    static ejecutar = async (mantenimiento: MantenimientoDTO): Promise<Mantenimiento> => {
        try {
            const resultado = validarMantenimiento(mantenimiento);
            if(!resultado.success) {
                throw new BadRequestError(resultado.error.errors[0].message);
            }
            return await new MantenimientoServicio().crearMantenimiento(resultado.data);
        } catch (error) {
            throw error;
        }
    }
}