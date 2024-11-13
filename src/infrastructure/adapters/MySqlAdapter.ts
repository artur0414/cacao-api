// Este archivo se encarga de realizar la conexión a la base de datos mysql 

import mysql from 'mysql2/promise'; // Se importa el módulo mysql2/promise
import { dbConfig } from '../database/dbConfig';  // Se importa la configuración de la base de datos
import { DatabaseError } from '../errors/CustomErrors'; // Se importan los errores personalizados

export class DatabaseAdapter {
    private connection;

    constructor(config: mysql.ConnectionOptions = dbConfig) {
        this.connection = mysql.createPool(config);
    }

    async query(sql: string, params?: string[]) {
        try {
            return await this.connection.query(sql, params);

        } catch (error : any) {
            switch (error.code) {
                case 'ECONNREFUSED':
                    throw new DatabaseError('No se pudo conectar a la base de datos. Por favor, contacte con el administrador.');

                default:
                    throw error;
            }     
        }
    }
}

// cambie oarams a string[] para que el método query pueda recibir un array de strings
