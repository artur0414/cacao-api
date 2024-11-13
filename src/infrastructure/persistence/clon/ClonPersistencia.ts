// Persistencia de los clones en la base de datos, que se encarga de almacenar, buscar, actualizar y eliminar clones en la base de datos.

import { RowDataPacket } from "mysql2";
import { ClonRepositorio } from "../../../domain/repositories/ClonRepositorio";
import { ClonEntity } from "../../entities/ClonEntity";
import { Clon } from "../../../domain/models/Clon";
import { DatabaseAdapter } from "../../adapters/MySqlAdapter";
import { DatabaseGenericError, DatabaseErrorHandler } from "../../errors/CustomErrors";



//Clase que implementa la interfaz de repositorio de clones
export class ClonPersistencia implements ClonRepositorio {
    constructor(private db: DatabaseAdapter) {}

    //Método que busca un clon por su nombre en la base de datos
    
    async buscarClonPorNombre(nombre: string): Promise<Clon | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Clon WHERE nombre_clon = ?', [nombre]);

            return Array.isArray(rows) && rows.length > 0 ? this.mapParaElDominio(rows[0] as ClonEntity) : null;
            
        } catch (error) {
            throw new DatabaseGenericError('Error al buscar el clon en la base de datos, por favor contacte con el administrador');
        }    
    }

    //Método que almacena un clon en la base de datos
    async almacenarClon(clon: Clon): Promise<Clon> {
        try {
            await this.db.query('INSERT INTO Clon (variedad, nombre_clon, origen, descripcion) VALUES (?, ?, ?, ?)', [clon.obtenerClonCacaoPlantaId(), clon.obtenerClonNombre(), clon.obtenerClonOrigen(), clon.obtenerClonDescripcion()]);

            const [resultado] = await this.db.query('SELECT * FROM Clon WHERE nombre_clon = ?', [clon.obtenerClonNombre()]);
            
            if(Array.isArray(resultado) && resultado.length > 0) {
                return this.mapParaElDominio(resultado[0] as ClonEntity);
            } 

            throw new DatabaseGenericError('Error al almacenar el clon en la base de datos, por favor contacte con el administrador');
            
        } catch (error : unknown) {
            throw new DatabaseErrorHandler(error, 'Error al almacenar el clon en la base de datos, por favor contacte con el administrador', 'clon').procesarError();
        }
    }

    // Método que obtiene el clon por su id

    async obtenerClonPorId(id: string): Promise<Clon | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Clon WHERE id = ?', [id]);
            return Array.isArray(rows) && rows.length > 0 ? this.mapParaElDominio(rows[0] as ClonEntity) : null;
        } catch (error) {
            throw new DatabaseGenericError('Error al obtener el clon en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método que eliminar un clon por su id
    async eliminarClon(id: string): Promise<void> {
        try {
            await this.db.query('DELETE FROM Clon WHERE id = ?', [id]);
            return
        } catch (error) {
            throw new DatabaseGenericError('Error al eliminar el clon en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método que actualiza un clon en la base de datos
    async actualizarClon(clon: Clon): Promise<Clon> {
        try {
            
            const [rows] = await this.db.query('UPDATE Clon SET nombre_clon = ?, origen = ?, descripcion = ? WHERE id = ?', [clon.obtenerClonNombre(), clon.obtenerClonOrigen(), clon.obtenerClonDescripcion(), clon.obtenerClonId()!]);

            if((rows as RowDataPacket).affectedRows === 0) {
                throw new DatabaseGenericError('El clon que desea actualizar no existe');
            }

            return clon
        } catch (error: unknown) {
            throw new DatabaseErrorHandler(error, 'Error al actualizar el clon en la base de datos, por favor contacte con el administrador', 'clon').procesarError();
        }
    }

    // Método que lista todos los clones en la base de datos

    async listarClones(): Promise<Clon[] | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Clon');
            
            if(Array.isArray(rows) && rows.length > 0) {
                const clones = rows as RowDataPacket;
                
                return clones.map((clon: RowDataPacket) => {
                    const clonEntity = new ClonEntity(clon.variedad, clon.nombre_clon, clon.origen, clon.descripcion, clon.id);
                    return new Clon(clonEntity.getVariedad(), clonEntity.getNombreClon(), clonEntity.getOrigen(), clonEntity.getDescripcion(), clonEntity.getId());
                });
            }

            return null;

        } catch (error) {
            throw new DatabaseGenericError('Error al listar los clones en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método que busca clones por variedad

    async buscarClonesPorVariedad(variedad: string): Promise<Clon[] | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Clon WHERE variedad = ?', [variedad]);
            
            if(Array.isArray(rows) && rows.length > 0) {
                const clones = rows as RowDataPacket;
                
                return clones.map((clon: RowDataPacket) => {
                    const clonEntity = new ClonEntity(clon.variedad, clon.nombre_clon, clon.origen, clon.descripcion, clon.id);
                    return new Clon(clonEntity.getVariedad(), clonEntity.getNombreClon(), clonEntity.getOrigen(), clonEntity.getDescripcion(), clonEntity.getId());
                });
            }

            return null

        } catch (error) {
            throw new DatabaseGenericError('Error al buscar los clones por variedad en la base de datos, por favor contacte con el administrador')
        }
    }

    // Método que mapea los datos de la base de datos a la entidad de dominio
    private mapParaElDominio(row: ClonEntity): Clon {
        const clonEntity = new ClonEntity(row.variedad, row.nombre_clon, row.origen, row.descripcion, row.id);

        return new Clon(clonEntity.getVariedad(), clonEntity.getNombreClon(), clonEntity.getOrigen(), clonEntity.getDescripcion(), clonEntity.getId());
    }
}