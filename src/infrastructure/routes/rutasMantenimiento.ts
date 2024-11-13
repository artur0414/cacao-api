// Rutas para mantenimiento de clones

import { Router } from 'express';
import { corsMiddleware } from '../middlewares/cors';
import { MantenimientoController } from '../../application/controllers/MantenimientoController';
import { apiKeyMiddleware } from '../middlewares/apiKey';

export const createMantenimientoConnection = () => {
    const router = Router();
    const mantenimientoController = new MantenimientoController();

    // Ruta para crear mantenimiento
    router.post('/mantenimiento', apiKeyMiddleware, corsMiddleware(), mantenimientoController.crearMantenimiento);

    // Ruta para actualizar mantenimiento
    router.patch('/mantenimiento/:id', apiKeyMiddleware, corsMiddleware(), mantenimientoController.actualizarMantenimiento);

    return router;
}