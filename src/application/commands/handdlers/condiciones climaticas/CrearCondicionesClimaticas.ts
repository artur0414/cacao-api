// Comando para crear condiciones climáticas o sirve como puente entre el controlador y el servicio de condiciones climáticas en caso de que se requiera una lógica de negocio más compleja

import { CondicionesClimaticas } from "../../../../domain/models/CondicionesClimaticas";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { CondicionesClimaticasDTO, validarCondicionesClimaticas } from "../../../dtos/condicionesClimaticas_dto";
import { CondicionesClimaticasServicio } from "../../../services/CondicionesClimaticasServicio";


export class CrearCondicionesClimaticas {
    static ejecutar = async (condicionesClimaticas: CondicionesClimaticasDTO): Promise<CondicionesClimaticas> => {
        try {
            const resultado = validarCondicionesClimaticas(condicionesClimaticas);
            if(!resultado.success) {
                throw new BadRequestError(resultado.error.errors[0].message);
            }
            return await new CondicionesClimaticasServicio().crearCondicionesClimaticas(resultado.data);
        } catch (error) {
            throw error;
        }
    }
}