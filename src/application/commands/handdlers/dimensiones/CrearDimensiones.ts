// Comando para crear dimensiones, se encarga de validar los datos y almacenarlos en la base de datos. Si se requiere una lógica adicional, procede a enviarlo al servicio correspondiente.

import { Dimensiones } from "../../../../domain/models/Dimensiones";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { DimensionesDTO, validarDimensiones } from "../../../dtos/Dimensiones_dto";
import { DimensionesServicio } from "../../../services/DimensionesServicio";


export class CrearDimensiones {
    static ejecutar = async (dimensiones: DimensionesDTO): Promise<Dimensiones> => {
        try {

            //convertir altura y diametro a number

            dimensiones.altura_maxima = Number(dimensiones.altura_maxima);
            dimensiones.diametro = Number(dimensiones.diametro);
            
            const validarDatos = validarDimensiones(dimensiones);
            if(!validarDatos.success) {
                throw new BadRequestError(validarDatos.error.errors[0].message);
            }
            return await new DimensionesServicio().crearDimensiones(dimensiones);
        } catch (error) {
            throw error;
        }
    }
}