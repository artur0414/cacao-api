//Este comando es un puente entre el controlador y la lógica de negocio de la aplicación. Se encarga de manejar la eliminación de una planta en la base de datos.

// Sí el proceso requiere una acción adicional, se utiliza como puente entre el controlador y el servicio. En este caso, se encarga de enviar el id de la planta al servicio correspondiente.

import { PlantaServicio } from "../../../services/PlantaServicio";

export class EliminarPlanta {

    static async ejecutar(id: string): Promise<void> {
        try {
            await new PlantaServicio().eliminarPlanta(id);
        } catch (error) {
            throw error; 
        }
    }
}