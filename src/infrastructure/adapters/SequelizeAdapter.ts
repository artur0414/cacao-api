// Adaptador de Sequelize para la conexión a la base de datos

import { Sequelize } from "sequelize";
import { dbSequelizeConfig } from "../database/dbSequelizeConfig";
import { DatabaseErrorHandler } from "../errors/CustomErrors";


export class SequelizeAdapter {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(dbSequelizeConfig );
    }    

    // Método para autenticar la conexión a la base de datos
    async authenticate() {
        try {
            await this.sequelize.authenticate();
        } catch (error) {
            throw new DatabaseErrorHandler(error, 'Error al autenticar la conexión a la base de datos.', 'SequelizeAdapter').procesarError();
        }
    }

    // Método para cerrar la conexión a la base de datos
    async close() {
        await this.sequelize.close();
    }

    obtenerSequelize() {
        return this.sequelize;
    }

}