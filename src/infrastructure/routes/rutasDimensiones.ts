// Rutas para las dimensiones de los productos

import { Router } from "express";
import { corsMiddleware } from "../middlewares/cors";
import { DimensionesController } from "../../application/controllers/DimensionesController";
import uploadAndProcessImages from "../middlewares/subirImagen";
import { apiKeyMiddleware } from "../middlewares/apiKey";



export const createDimensionesConnection = () => {
    const router = Router();
    const dimensionesController = new DimensionesController();

    // Ruta para crear dimensiones
    router.post('/dimensiones', apiKeyMiddleware, corsMiddleware(), uploadAndProcessImages, dimensionesController.crearDimensiones);
    //Ruta para Actualizar Imagen - Se hace con el nombre del clon ya que es el identificador
    router.patch('/actualizar-imagen', apiKeyMiddleware, corsMiddleware(), uploadAndProcessImages, dimensionesController.actualizarImagenes);
    // Ruta para Actualizar Dimensiones
    router.patch('/dimensiones/:id', apiKeyMiddleware, corsMiddleware(), dimensionesController.actualizarDimensiones);

    //Ruta para test, y evitar la simulación o carga de imagenes al cloud storage
    router.post('/dimensiones-test', apiKeyMiddleware, corsMiddleware(), dimensionesController.crearDimensiones);

    return router
}