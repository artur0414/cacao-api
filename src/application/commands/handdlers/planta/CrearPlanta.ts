// Este comando es un puente entre el controlador y la lógica de negocio de la aplicación. Se encarga de manejar la actualización de una planta en la base de datos.

// Sí el proceso requiere una acción adicional, se utiliza como puente entre el controlador y el servicio. En este caso, se encarga de validar los datos de la planta y enviarlos al servicio correspondiente.

import { Planta } from "../../../../domain/models/Planta";
import { BadRequestError } from "../../../../infrastructure/errors/CustomErrors";

import { PlantaDTO, validarPlanta } from "../../../dtos/planta_dto";

import { PlantaServicio } from "../../../services/PlantaServicio";


export class CrearPlanta {

    static ejecutar = async (datos: PlantaDTO): Promise<Planta> => {
        try {
            const plantaDatos = validarPlanta(datos);
                        
            if (!plantaDatos.success) {
                throw new BadRequestError(plantaDatos.error.errors[0].message);
            }
            return await new PlantaServicio().almacenarPlanta(plantaDatos.data);

        } catch (error) {
            throw error;
        }
    }
}
