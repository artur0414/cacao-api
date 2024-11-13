// Persistencia de las dimensiones de los clones en la base de datos

import { Dimensiones } from "../../../domain/models/Dimensiones";
import { DimensionesRepositorio } from "../../../domain/repositories/DimensionesRepositorio";
import { DatabaseAdapter } from "../../adapters/MySqlAdapter";
import { DimensionesEntity } from "../../entities/DimensionesEntity";
import { DatabaseErrorHandler, DatabaseGenericError } from "../../errors/CustomErrors";


export class DimensionesPersistencia implements DimensionesRepositorio {
    constructor(private db: DatabaseAdapter) {}

    // Método para almacenar las dimensiones de los clones en la base de datos
    async almacenarDimensiones(dimensiones: Dimensiones): Promise<Dimensiones> {
        try {
            const imagenes = JSON.stringify(dimensiones.obtenerImagenes());
            await this.db.query('INSERT INTO Dimensiones (nombre_clon, altura_maxima, diametro, imagenes) VALUES (?, ?, ?, ?)', [dimensiones.obtenerNombreClon(), String(dimensiones.obtenerAlturaMaxima()), String(dimensiones.obtenerDiametro()), imagenes]);

            const [resultado] = await this.db.query('SELECT * FROM Dimensiones WHERE nombre_clon = ?', [dimensiones.obtenerNombreClon()]);

            if(Array.isArray(resultado) && resultado.length !== 0) {
                return this.mapParaElDominio(resultado[0] as DimensionesEntity);
            }

            throw new DatabaseGenericError('Error al obtener las dimensiones en la base de datos, por favor contacte con el administrador');
            
        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al almacenar las dimensiones en la base de datos', 'clon').procesarError();
        }
    }

    // Método para obtener las dimensiones de los clones por el nombre del clon
    async obtenerDimensionesPorNombreClon(nombreClon: string): Promise<Dimensiones | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Dimensiones WHERE nombre_clon = ?', [nombreClon])

            return Array.isArray(rows) && rows.length !== 0 ? this.mapParaElDominio(rows[0] as DimensionesEntity) : null
        } catch (error) {
            throw new DatabaseGenericError('Error al obtener las dimensiones en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método para obtener las dimensiones de los clones por el id
    async obtenerDimensionesPorId(id: string): Promise<Dimensiones | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Dimensiones WHERE id = ?', [id])

            return Array.isArray(rows) && rows.length !== 0 ? this.mapParaElDominio(rows[0] as DimensionesEntity) : null

        } catch (error) {
            throw new DatabaseGenericError('Error al obtener las dimensiones en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método para actualizar las dimensiones de los clones en la base de datos
    async actualizarDimensiones(dimensiones: Dimensiones): Promise<Dimensiones> {
        try {
            const imagenes = JSON.stringify(dimensiones.obtenerImagenes());
            await this.db.query('UPDATE Dimensiones SET nombre_clon = ?, altura_maxima = ?, diametro = ?, imagenes = ? WHERE id = ?', [dimensiones.obtenerNombreClon(), String(dimensiones.obtenerAlturaMaxima()), String(dimensiones.obtenerDiametro()), imagenes, dimensiones.obtenerId()!]);
            return dimensiones;
        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al actualizar las dimensiones en la base de datos', 'clon').procesarError();
        }
    }

    // Método para mapear los datos de la base de datos a la entidad de dominio
    private mapParaElDominio(row: DimensionesEntity): Dimensiones{
        try {
            let imagenes
            if(typeof row.imagenes === 'string') {
                imagenes = JSON.parse(row.imagenes);
            } else {
                imagenes = row.imagenes;
            }

            const dimensionesEntidad = new DimensionesEntity(row.nombre_clon, Number(row.altura_maxima), Number(row.diametro), imagenes, row.id);

            return new Dimensiones(dimensionesEntidad.obtenerNombreClon(), dimensionesEntidad.obtenerAlturaMaxima(), dimensionesEntidad.obtenerDiametro(), dimensionesEntidad.obtenerImagenes(), dimensionesEntidad.obtenerId());

        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al mapear los datos de la base de datos a la entidad de dominio', 'clon').procesarError();
        }
    }
}