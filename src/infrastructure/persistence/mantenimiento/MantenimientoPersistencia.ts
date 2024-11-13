// Persistencia de los mantenimientos en la base de datos

import { RowDataPacket } from "mysql2";
import { Mantenimiento } from "../../../domain/models/Mantenimiento";
import { MantenimientoRepositorio } from "../../../domain/repositories/MantenimientoRepositorio";
import { DatabaseAdapter } from "../../adapters/MySqlAdapter";
import { MantenimientoEntity } from "../../entities/MantenimientoEntity";
import { DatabaseErrorHandler, DatabaseGenericError } from "../../errors/CustomErrors";


export class MantenimientoPersistencia implements MantenimientoRepositorio {
    
    constructor(private db: DatabaseAdapter) {}

    // Método para almacenar un mantenimiento en la base de datos
    async almacenarMantenimiento(mantenimiento: Mantenimiento): Promise<Mantenimiento> {
        try {
            const nombreClon = mantenimiento.obtenerNombreClon();
            const frecuenciaPodas = mantenimiento.obtenerFrecuenciaPodas();
            // Convertir el array de strings a una cadena JSON
            const tipoAbonosJson = JSON.stringify(mantenimiento.obtenerTipoAbonos());

            // Ejecutar la consulta SQL con la cadena JSON
            await this.db.query(
                'INSERT INTO Mantenimiento (nombre_clon, tipo_abonos, frecuencia_podas) VALUES (?, ?, ?)',
                [nombreClon, tipoAbonosJson, frecuenciaPodas]
            );

            const [id] = await this.db.query('SELECT id FROM Mantenimiento WHERE nombre_clon = ?', [nombreClon]);

            return new Mantenimiento(nombreClon, mantenimiento.obtenerTipoAbonos(), frecuenciaPodas, (id as RowDataPacket)[0].id);

        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al almacenar el mantenimiento en la base de datos', 'clon').procesarError();
        }
    }

    // Método para obtener un mantenimiento por el nombre del clon
    async obtenerMantenimientoPorNombreClon(nombreClon: string): Promise<Mantenimiento | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Mantenimiento WHERE nombre_clon = ?', [nombreClon]);
            return Array.isArray(rows) && rows.length > 0 ? this.mapRowToMantenimiento(rows[0] as RowDataPacket) : null;

        } catch (error) {
            throw new DatabaseGenericError('Error al obtener el mantenimiento en la base de datos, por favor contacte con el administrador');
        }
    }
    
    // Método para obtener un mantenimiento por el id
    async obtenerMantenimientoPorId (id: string): Promise<Mantenimiento | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Mantenimiento WHERE id = ?', [id]);
            return Array.isArray(rows) && rows.length > 0 ? this.mapRowToMantenimiento(rows[0] as RowDataPacket) : null;
        } catch (error) {
            throw new DatabaseGenericError('Error al obtener el mantenimiento en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método para actualizar un mantenimiento
    async actualizarMantenimiento (mantenimiento: Mantenimiento): Promise<Mantenimiento> {
        try {
            const tipoAbonosJson = JSON.stringify(mantenimiento.obtenerTipoAbonos());

            await this.db.query('UPDATE Mantenimiento SET nombre_clon = ?, tipo_abonos = ?, frecuencia_podas = ? WHERE id = ?', [mantenimiento.obtenerNombreClon(), tipoAbonosJson, mantenimiento.obtenerFrecuenciaPodas(), mantenimiento.obtenerId()]);

            return mantenimiento;

        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al actualizar el mantenimiento en la base de datos', 'clon').procesarError();
        }
    }

    // Método para mapear los datos de la base de datos a un objeto de tipo Mantenimiento
    private mapRowToMantenimiento(row: RowDataPacket): Mantenimiento {

        try {
            let tipoAbonos;
        
            if( typeof row.tipo_abonos === 'string') {
                tipoAbonos = JSON.parse(row.tipo_abonos);
            } else {
                tipoAbonos = row.tipo_abonos;
            }

            const mantenimientoEntidad = new MantenimientoEntity(row.nombre_clon, tipoAbonos, row.frecuencia_podas, row.id);

            return new Mantenimiento(mantenimientoEntidad.nombre_clon, mantenimientoEntidad.tipo_abonos, mantenimientoEntidad.frecuencia_podas, mantenimientoEntidad.id!);
        } catch (error:any) {
            throw new DatabaseErrorHandler(error, 'Error al mapear los datos de la base de datos a la entidad de dominio', 'clon').procesarError();
        }
    }
}