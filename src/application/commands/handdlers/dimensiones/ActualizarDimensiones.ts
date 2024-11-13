// Comando para Actualizar Dimensiones o Imagenes. Si se requiere una lógica más compleja, se puede implementar en el servicio correspondiente.

import { Dimensiones } from "../../../../domain/models/Dimensiones";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";
import { DimensionesDTO, validarParcialDimensiones } from "../../../dtos/Dimensiones_dto";
import { DimensionesServicio } from "../../../services/DimensionesServicio";

export class ActualizarDimensiones {
    static actualizarDimensiones = async (dimensiones: Partial<DimensionesDTO> & {id: string}): Promise<Dimensiones> => {
            try {
                //convertir altura y diametro a number
    
                if(dimensiones.altura_maxima) dimensiones.altura_maxima = Number(dimensiones.altura_maxima);

                if(dimensiones.diametro) dimensiones.diametro = Number(dimensiones.diametro);

                const validarDatos = validarParcialDimensiones(dimensiones);

                if(!validarDatos.success){
                    throw new BadRequestError(validarDatos.error.errors[0].message);
                }
                
                return await new DimensionesServicio().actualizarDimensiones(dimensiones);
    
            } catch (error) {
                throw error;
            }
    }

    static actualizarImagenes = async (dimensiones: Partial<DimensionesDTO>): Promise<Dimensiones> => {
        try {
            const validarDatos = validarParcialDimensiones(dimensiones);

            if(!validarDatos.success){
                throw new BadRequestError(validarDatos.error.errors[0].message);
            }

            return await new DimensionesServicio().actualizarImagenes(dimensiones);
        } catch (error) {
            throw error;
        }
    }

}