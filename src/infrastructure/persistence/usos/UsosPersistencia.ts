// Persistencia de los usos en la base de datos

import { Usos } from "../../../domain/models/Usos";
import { UsosRepositorio } from "../../../domain/repositories/UsosRepositorio";
import { DatabaseAdapter } from "../../adapters/MySqlAdapter";
import { UsosEntity } from "../../entities/UsosEntity";
import {  DatabaseErrorHandler, DatabaseGenericError } from "../../errors/CustomErrors";


export class UsosPersistencia implements UsosRepositorio {
    constructor(private db: DatabaseAdapter) {}

    // Método para almacenar los usos en la base de datos
    async almacenarUsos(usos: Usos): Promise<Usos> {
        try {
            const usosJson = JSON.stringify(usos.obtenerUsos());
            const expansionGeograficaJson = JSON.stringify(usos.obtenerExpansionGeografica());
            await this.db.query('INSERT INTO Usos (nombre_clon, usos, expansion_geografica) VALUES(?, ?, ?)', [usos.obtenerNombreClon(), usosJson, expansionGeograficaJson]);

            const [resultado] = await this.db.query('SELECT * FROM Usos WHERE nombre_clon = ?', [usos.obtenerNombreClon()]);

            if (Array.isArray(resultado) && resultado.length !== 0) {
                return this.mapParaElDominio(resultado[0] as UsosEntity);
            }

            throw new DatabaseGenericError('Error al almacenar los usos en la base de datos, por favor contacte con el administrador');

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al almacenar los usos en la base de datos, por favor contacte con el administrador','clon').procesarError();
        }
    }

    // Método para obtener los usos por nombre de clon
    async obtenerUsosPorNombreClon(nombreClon: string): Promise<Usos | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Usos WHERE nombre_clon = ?', [nombreClon])

            return Array.isArray(rows) && rows.length !== 0 ? this.mapParaElDominio(rows[0] as UsosEntity) : null

        } catch (error) {
            throw new DatabaseGenericError('Error al obtener los usos en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método para obtener los usos por id
    async obtenerUsosPorId(id:string): Promise<Usos | null> {
        try {
            const [rows] = await this.db.query('SELECT * FROM Usos WHERE id = ?', [id])

            return Array.isArray(rows) && rows.length !== 0 ? this.mapParaElDominio(rows[0] as UsosEntity) : null

        } catch (error) {
            throw new DatabaseGenericError('Error al obtener los usos en la base de datos, por favor contacte con el administrador');
        }
    }

    // Método para actualizar los usos en la base de datos
    async actualizarUsos(usos: Usos): Promise<Usos> {
        try {
            const usosJson = JSON.stringify(usos.obtenerUsos());
            const expansionGeograficaJson = JSON.stringify(usos.obtenerExpansionGeografica());

            await this.db.query('UPDATE Usos SET nombre_clon = ?, usos = ?, expansion_geografica = ? WHERE id = ?', [usos.obtenerNombreClon(), usosJson, expansionGeograficaJson, usos.obtenerId()!]);

            return usos;

        } catch (error: any) {
            throw new DatabaseErrorHandler(error, 'Error al actualizar los usos en la base de datos, por favor contacte con el administrador','clon').procesarError();
        }
    }

    // Método para mapear los datos de la base de datos a la entidad de dominio
    private mapParaElDominio(row: UsosEntity): Usos {
        try {
            let usos
            let expansionGeografica

            if (typeof row.usos === 'string' && typeof row.expansion_geografica === 'string') {
                usos = JSON.parse(row.usos)
                expansionGeografica = JSON.parse(row.expansion_geografica)
            } else {
                usos = row.usos
                expansionGeografica = row.expansion_geografica
            }

            const usosEntidad = new UsosEntity(row.nombre_clon, usos, expansionGeografica, row.id);

            return new Usos(usosEntidad.obtenerNombreClon(), usosEntidad.obtenerUsos(), usosEntidad.obtenerExpansionGeografica(), usosEntidad.obtenerId());

        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al mapear los datos de los usos en la base de datos, por favor contacte con el administrador','clon').procesarError();
        }
    }
}