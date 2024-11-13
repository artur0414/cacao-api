// Comando que se encarga de crear una caracteristica de clon o actualizarla si ya exist, puede ser utilizado como puente entre la capa de controladores y servicios si se requiere realizar alguna operación antes de realizar la acción principal.

import { CaracteristicaClon } from "../../../../domain/models/CaracteristicaClon";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { CaracteristicasClonDTO, validarCaracteristicasClon } from "../../../dtos/caracteristicasClon_dto";
import { CaracteristicasServicio } from "../../../services/CaracteristicasClonServicio";

export class CrearCaracteristicas {

    static async ejecutar(caracteristicaData: CaracteristicasClonDTO): Promise<CaracteristicaClon> {
        try {
            const caracteristicasDatos = validarCaracteristicasClon(caracteristicaData);
            if(!caracteristicasDatos.success) {
                throw new BadRequestError(caracteristicasDatos.error.errors[0].message);
            }

            const minusculas = caracteristicaData.caracteristicas.map(caracteristica => caracteristica.toLowerCase());
        
            const  caracteristica = {
                nombre_clon: caracteristicaData.nombre_clon, 
                caracteristicas: minusculas
            }

            return await new CaracteristicasServicio().crearCaracteristicas(caracteristica);
            
        } catch (error) {
            throw error
        }
    }
}