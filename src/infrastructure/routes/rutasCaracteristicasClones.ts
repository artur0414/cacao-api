// Rutas para las caracteristicas de los clones

import {Router} from "express"
import { corsMiddleware } from "../middlewares/cors"
import { CaracteristicasClonesController } from "../../application/controllers/CaracteristicasClonesController";
import {apiKeyMiddleware} from "../middlewares/apiKey";

export const createCaracteristicasClonesConnection = () => {
    const router = Router();
    const caracteristicasClonesController = new CaracteristicasClonesController();

    // Ruta para crear o actualizar caracteristicas de clones
    router.put('/caracteristicas', corsMiddleware(), apiKeyMiddleware, caracteristicasClonesController.crearCaracteristicas);

    return router;
}