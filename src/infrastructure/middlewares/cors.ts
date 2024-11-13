// Propósito: Configurar el middleware de CORS para permitir solicitudes de origen cruzado (CORS) en la API.

import cors from 'cors';

const ALLOWED_ORIGINS = ['https://frontend-users-ho6g9prlm-arturo-acostas-projects.vercel.app']

export const corsMiddleware = ({ allowedOrigins = ALLOWED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            // Permitir solicitudes sin origen (por ejemplo, curl, Postman)
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    });
};

// Opciones de configuración de CORS para permitir solo solicitudes GET
export const corsOptions = {
    methods: 'GET'
};