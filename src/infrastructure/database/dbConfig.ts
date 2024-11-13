// Este archivo contiene la configuración de la base de datos

import { config } from 'dotenv';
import { ConnectionOptions } from 'mysql2';

config();

export const dbConfig: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306'),
};

