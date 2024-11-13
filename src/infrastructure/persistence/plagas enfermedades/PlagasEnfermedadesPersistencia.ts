// Persistencia de las plagas y enfermedades

import { PlagasEnfermedades } from "../../../domain/models/PlagasEnfermedades";
import { PlagasEnfermedadesRepositorio } from "../../../domain/repositories/PlagasEnfermedadesRepositorio";
import { DatabaseAdapter } from "../../adapters/MySqlAdapter";
import { PlagasEnfermedadesEntity } from "../../entities/PlagasEnfermedadesEntity";
import { DatabaseError, DatabaseErrorHandler, DatabaseGenericError } from "../../errors/CustomErrors";
import { RowDataPacket } from "mysql2";


export class PlagasEnfermedadesPersistencia implements PlagasEnfermedadesRepositorio {
    constructor(private db: DatabaseAdapter) {}

    async almacenarPlagaEnfermedad(plagaEnfermedad: PlagasEnfermedades): Promise<PlagasEnfermedades> {
        try {
            const asociacionesPlagasEnfermedades = JSON.stringify(plagaEnfermedad.obtenerAsociacionesPlagasEnfermedades());

            await this.db.query('INSERT INTO PlagasEnfermedades (nombre_clon, asociaciones_plagas_enfermedades) VALUES(?, ?)', [plagaEnfermedad.obtenerNombreClon(), asociacionesPlagasEnfermedades]);

            const [resultado] = await this.db.query('SELECT * FROM PlagasEnfermedades WHERE nombre_clon = ?', [plagaEnfermedad.obtenerNombreClon()]);

            if(Array.isArray(resultado) && resultado.length > 0) {
                return this.mapParaElDominio(resultado[0] as PlagasEnfermedadesEntity);
            }

            throw new DatabaseError('Error al almacenar la plaga o enfermedad en la base de datos, por favor contacte con el administrador');

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al almacenar la plaga o enfermedad en la base de datos, por favor contacte con el administrador', 'clon').procesarError();
        }
    }

    // Método para obtener la plaga o enfermedad por nombre de clon
    async obtenerPlagaEnfermedadPorNombreClon(nombreClon: string): Promise<PlagasEnfermedades | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM PlagasEnfermedades WHERE nombre_clon = ?', [nombreClon]);

            return Array.isArray(rows) && rows.length > 0 ? this.mapParaElDominio(rows[0] as PlagasEnfermedadesEntity) : null;

        } catch (error) {
            throw new DatabaseGenericError('Error al obtener la plaga o enfermedad en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método para obtener la plaga o enfermedad por id
    async obtenerPlagaEnfermedadPorId(id: string): Promise<PlagasEnfermedades | null> {
        try {
            const [rows] = await this.db.query('SELECT * from PlagasEnfermedades WHERE id = ?', [id])

            return Array.isArray(rows) && rows.length > 0 ? this.mapParaElDominio(rows[0] as PlagasEnfermedadesEntity) : null

            
        } catch (error) {
            throw new DatabaseGenericError('Error al obtener la plaga o enfermedad en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método para actualizar la plaga o enfermedad
    async actualizarPlagaEnfermedad(plagaEnfermedad: PlagasEnfermedades): Promise<PlagasEnfermedades> {
        try {
            const asociacionesPlagasEnfermedades = JSON.stringify(plagaEnfermedad.obtenerAsociacionesPlagasEnfermedades());
            const [rows] = await this.db.query('UPDATE PlagasEnfermedades SET nombre_clon = ?, asociaciones_plagas_enfermedades = ? WHERE id = ?', [plagaEnfermedad.obtenerNombreClon(), asociacionesPlagasEnfermedades, plagaEnfermedad.obtenerId()!]);

            if((rows as RowDataPacket).affectedRows === 0) {
                throw new DatabaseError('No se puede actualizar la plaga o enfermedad porque el id no existe en la base de datos. Por favor, verifique los datos ingresados.');
            }

            return plagaEnfermedad;
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al actualizar la plaga o enfermedad en la base de datos, por favor contacte con el administrador', 'clon').procesarError();
        }
    }

    // Método para mapear los datos de la base de datos a la entidad de dominio
    private mapParaElDominio(row: PlagasEnfermedadesEntity): PlagasEnfermedades {

        try {
            let asociacionesPlagasEnfermedades

            if (typeof row.asociaciones_plagas_enfermedades === 'string') {
                asociacionesPlagasEnfermedades = JSON.parse(row.asociaciones_plagas_enfermedades);
            } else {
                asociacionesPlagasEnfermedades = row.asociaciones_plagas_enfermedades;
            }

            const plagaEnfermedadEntidad = new PlagasEnfermedades(row.nombre_clon, asociacionesPlagasEnfermedades, row.id);

            return new PlagasEnfermedades(plagaEnfermedadEntidad.obtenerNombreClon(), plagaEnfermedadEntidad.obtenerAsociacionesPlagasEnfermedades(), plagaEnfermedadEntidad.obtenerId());
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al mapear los datos de la base de datos a la entidad de dominio, por favor contacte con el administrador', 'clon').procesarError();
        }
    }
}