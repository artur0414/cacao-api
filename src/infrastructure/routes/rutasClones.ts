//Rutas para la conexión con la base de datos de clones

import {Router} from 'express'
import { corsMiddleware, corsOptions } from '../middlewares/cors'
import { ClonesController } from '../../application/controllers/ClonController'
import cors from 'cors';
import { apiKeyMiddleware } from '../middlewares/apiKey';

//Función que crea la conexión con la base de datos de clones

export const createClonesConnection = () => {
    const router = Router();
    const clonesController = new ClonesController(); 

    //Almacenar un clon en la base de datos
    router.post('/clon', apiKeyMiddleware, corsMiddleware(), clonesController.crearClon);

    //Eliminar un clon de la base de datos
    router.delete('/clon/:id', apiKeyMiddleware, corsMiddleware(), clonesController.eliminarClon);

    //Actualizar un clon de la base de datos
    router.patch('/clon/:id', apiKeyMiddleware, corsMiddleware(), clonesController.actualizarClon);

    //Obtener todos los clones de la base de datos y filtrar por nombre_clon o variedad

    router.get('/clon', cors(corsOptions), clonesController.ListarClones);

    // Ruta para obtener todos los clones con sus detalles o tablas relacionadas // se puede filtar en parametros por nombre_clon, variedad, caracteristica, usos, expogeo y id 

    router.get('/clon/detalles', cors(corsOptions), clonesController.obtenerClonesConDetalles);

    return router;
}