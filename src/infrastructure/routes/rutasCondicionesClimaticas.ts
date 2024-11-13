//Rutas para crear y actualizar condiciones climáticas

import {Router} from 'express'
import { corsMiddleware } from '../middlewares/cors'
import { CondicionesClimaticasController } from '../../application/controllers/CondicionesClimaticasController';
import { apiKeyMiddleware } from '../middlewares/apiKey';

export const createCondicionesClimaticasConnection = () => {
    const router = Router();
    const condicionesClimaticasController = new CondicionesClimaticasController();

    // Ruta para crear condiciones climáticas
    router.post('/condiciones-climaticas', apiKeyMiddleware, corsMiddleware(), condicionesClimaticasController.crearCondicionesClimaticas);

    // Ruta para actualizar condiciones climáticas

    router.patch('/condiciones-climaticas/:id', apiKeyMiddleware, corsMiddleware(), condicionesClimaticasController.actualizarCondicionesClimaticas);

    return router;
}