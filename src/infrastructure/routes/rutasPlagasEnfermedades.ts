// Rutas para el CRUD de plagas y enfermedades

import { Router } from "express";
import { corsMiddleware } from "../middlewares/cors";
import { PlagasEnfermedadesController } from "../../application/controllers/PlagasEnfermedadesController";
import { apiKeyMiddleware } from "../middlewares/apiKey";


export const createPlagasEnfermedadesConnection = () => {
    const router = Router();
    const plagasEnfermedadesController = new PlagasEnfermedadesController();

    // Ruta para crear plagas y enfermedades
    router.post('/plagas-enfermedades', apiKeyMiddleware, corsMiddleware(), plagasEnfermedadesController.crearPlagasEnfermedades);

    //ruta para actualizar plagas y enfermedades
    router.patch('/plagas-enfermedades/:id', apiKeyMiddleware, corsMiddleware(), plagasEnfermedadesController.actualizarPlagasEnfermedades);
    
    return router
}