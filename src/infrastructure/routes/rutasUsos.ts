// Rutas de la entidad Usos

import { Router } from "express";
import { corsMiddleware } from "../middlewares/cors";
import { UsosController } from "../../application/controllers/UsosController";
import { apiKeyMiddleware } from "../middlewares/apiKey";

export const createUsosConnection = () => {
    const router = Router();

    const usosController = new UsosController();

    // Creación de usos
    router.post('/usos', apiKeyMiddleware, corsMiddleware(), usosController.crearUsos);
    //Actualización de usos
    router.patch('/usos/:id', apiKeyMiddleware, corsMiddleware(), usosController.actualizarUsos);

    return router;
}