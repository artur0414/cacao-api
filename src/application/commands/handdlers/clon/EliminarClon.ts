// Comando que elimina un clon de la base de datos o se usa como puente entre el controlador y el servicio de clon en caso de que se necesite realizar alguna acción antes de eliminar el clon.

import { ClonServicio } from "../../../services/ClonServicio";

export class EliminarClon {
    static async ejecutar(id: string): Promise<void> {
        try {
            await new ClonServicio().eliminarClon(id);
        } catch (error) {
            throw error;
        }
    }
}