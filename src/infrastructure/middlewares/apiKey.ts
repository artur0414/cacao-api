// Middleware para validar la clave de API en los headers de la petición

import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config();

const apiKey = process.env.API_KEY;

export const apiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) :Promise<void>  => {
    const apiKeyHeader = req.header('x-api-key');
    
    // Si no hay clave de API en los headers
    if (!apiKeyHeader) {
        res.status(400).json({
            error: 'Acceso no autorizado',
            message: 'Se requiere una clave de API en los headers.'
        });
        return
    }

    // Si la clave es incorrecta
    if (apiKeyHeader !== apiKey) {
        res.status(401).json({
            error: 'Acceso no autorizado',
            message: 'Clave de API incorrecta.'
        });
        return
    }

    next(); 
};