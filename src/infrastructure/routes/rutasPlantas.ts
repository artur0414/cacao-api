// Archivo de rutas para las plantas

import { Router } from 'express';
import { PlantaController } from '../../application/controllers/PlantaController';
import { corsMiddleware, corsOptions } from '../middlewares/cors';
import cors from 'cors';
import { apiKeyMiddleware } from '../middlewares/apiKey';

export const createPlantasConnection = () => {
    const router = Router();
    const plantaController = new PlantaController();

    // Ruta para crear una planta
    router.post('/plantas', apiKeyMiddleware, corsMiddleware(), plantaController.crearPlanta);

    // Ruta para eliminar una planta
    router.delete('/plantas/:id', apiKeyMiddleware, corsMiddleware(), plantaController.eliminarPlanta);

    // Ruta para actualizar una planta
    router.patch('/plantas/:id', apiKeyMiddleware, corsMiddleware(), plantaController.actualizarPlanta);

    // Ruta para listar todas las plantas
    // Se pueden obtener plantas por variedad y especie mediante query params
    router.get('/plantas', cors(corsOptions), plantaController.listarPlantas);

    // Ruta para obtener todas las plantas con sus clones
    router.get('/plantas/clones', cors(corsOptions), plantaController.obtenerPlantasConClones);

    // Ruta para obtener todas las plantas con sus clones 

    router.get('/plantas/clones/detalles', cors(corsOptions), plantaController.otenerPlantasConClonesDetalles);

    // Ruta para obtener plantas y estadisticas por especie o variedad

    router.get('/plantas/estadisticas', cors(corsOptions), plantaController.obtenerEstadisticasPlantas);

    return router;
}