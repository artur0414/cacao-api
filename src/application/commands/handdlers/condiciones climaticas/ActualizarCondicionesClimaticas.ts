// Comando para actualizar condiciones climáticas o sirve como puente entre el controlador y el servicio de condiciones climáticas en caso de que se requiera una lógica de negocio adicional

import { CondicionesClimaticas } from "../../../../domain/models/CondicionesClimaticas";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { CondicionesClimaticasDTO, validarParcialCondicionesClimaticas } from "../../../dtos/condicionesClimaticas_dto";
import { CondicionesClimaticasServicio } from "../../../services/CondicionesClimaticasServicio";



export class ActualizarCondicionesClimaticas {
    static async ejecutar(condicionesClimaticas: Partial<CondicionesClimaticasDTO> & { id: string }): Promise<CondicionesClimaticas> {
        try {
            const validarCondicionesClimaticas = validarParcialCondicionesClimaticas(condicionesClimaticas);
            if(!validarCondicionesClimaticas.success){
                throw new BadRequestError(validarCondicionesClimaticas.error.errors[0].message)
            }

            return await new CondicionesClimaticasServicio().actualizarCondicionesClimaticas(condicionesClimaticas); 
        } catch (error) {
            throw error;
        }
    }
}