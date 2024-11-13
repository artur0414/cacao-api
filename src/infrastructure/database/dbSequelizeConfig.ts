//Configuración de la base de datos mysql

import { Options  } from "sequelize";
import { config } from "dotenv";

config();

export const dbSequelizeConfig: Options  = {
    dialect: "mysql", 
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    logging: false // Deshabilitar el logging
};