// Persistencia de las caracteristicas de los clones

import { RowDataPacket } from "mysql2";
import { CaracteristicaClon } from "../../../domain/models/CaracteristicaClon";
import { CaracteristicasClonRepositorio } from "../../../domain/repositories/CaracteristicaClonRepositorio";
import { DatabaseAdapter } from "../../adapters/MySqlAdapter";
import { DatabaseErrorHandler, DatabaseGenericError } from "../../errors/CustomErrors";
import { CaracteristicasClonEntity } from "../../entities/CaracteristicaClonEntity";

// Implementación de la interfaz de repositorio de características de clones
export class CaracteristicasClonPersistencia implements CaracteristicasClonRepositorio {
    constructor(private db: DatabaseAdapter) {}

    // Almacenar las características de un clon si no existen
    async almacenarCaracteristicas(datos: CaracteristicaClon): Promise<CaracteristicaClon> {

        try {

            const nombreClon = datos.obtenerNombreClon();
        
            //Convertir las características a JSON para almacenarlas en la base de datos
            const caracteristicas = JSON.stringify(datos.obtenerCaracteristicas());

            await this.db.query(
                `INSERT INTO Caracteristica (nombre_clon, caracteristicas) VALUES (?, ?)`,
                [nombreClon, caracteristicas]
            );

            const [id] = await this.db.query ( `SELECT id FROM Caracteristica WHERE nombre_clon = ?`, [nombreClon])

            return new CaracteristicaClon(nombreClon, datos.obtenerCaracteristicas(), (id as RowDataPacket)[0].id);
                        
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al almacenar las características, por favor contacte al administrador', 'clon').procesarError();
        }
    }

    // Actualizar las características de un clon
    async actualizarCaracteristicas(id: string, nombreClon: string, caracteristicas: string[]): Promise<CaracteristicaClon> {

        try {

            // Eliminar las características existentes
            await this.db.query(
                `DELETE FROM Caracteristica 
                 WHERE id = ?`,
                [id]
            );

            // Convertir las características a JSON para almacenarlas en la base de datos
            const caracteristicasJson = JSON.stringify(caracteristicas);

            // Insertar nuevas características
            await this.db.query(

                `INSERT INTO Caracteristica (nombre_clon, caracteristicas) VALUES (?, ?)`,
                [nombreClon, caracteristicasJson]
            );

            const caracteristicasActualizadas =  {
                nombre_clon: nombreClon,
                caracteristicas: caracteristicas,
                id: id
            }

            return new CaracteristicaClon(caracteristicasActualizadas.nombre_clon, caracteristicasActualizadas.caracteristicas, caracteristicasActualizadas.id);
            
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al actualizar las características, por favor contacte al administrador', 'clon').procesarError();
        }
    }

    // Obtener las características de un clon por su nombre
    async obtenerCaracteristicasPorNombre(nombre: string): Promise<CaracteristicaClon | null> {
        try {
            const [rows] = await this.db.query(
                `SELECT * FROM Caracteristica 
                 WHERE nombre_clon = ?`,
                [nombre]
            );

            return (rows as RowDataPacket).length > 0 ? this.mapRowToCaracteristicaClon((rows as RowDataPacket)[0]) : null;

        } catch (error) {
            throw new DatabaseGenericError('Error al obtener la característica');
        }
    }

    // Método para mapear los datos de la base de datos a una entidad de características de clon

    private mapRowToCaracteristicaClon(row: RowDataPacket): CaracteristicaClon {
        try {
            let caracteristicas;
            try {
                caracteristicas = JSON.parse(row.caracteristicas);
            } catch (e) {
                caracteristicas = row.caracteristicas;
            }

            const caracteristicasEntidad = new CaracteristicasClonEntity(row.nombre_clon, caracteristicas, row.id);

            const Caracteristicas =  new CaracteristicaClon(caracteristicasEntidad.nombre_clon, caracteristicasEntidad.caracteristicas, caracteristicasEntidad.id);

            return Caracteristicas;
        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al mapear las características', 'clon').procesarError();
        }
    }
}