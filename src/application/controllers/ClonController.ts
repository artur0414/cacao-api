// Controlador de la entidad Clon

import { Request, Response } from 'express';
import { NotFoundError, DuplicateEntryError, DatabaseError, DatabaseGenericError, BadRequestError } from '../../infrastructure/errors/CustomErrors';
import { CrearClon, EliminarClon, ActualizarClon } from '../commands/handdlers/clon';
import { ListarClones, ObtenerClonesConDetalles } from '../../application/queries/handdlers/clon';
import { ClonesConsultasPersistencia } from '../../infrastructure/persistence/clon/ClonesConsultasPersistencia';


// Clase que se encarga de manejar las peticiones relacionadas con la entidad Clon
export class ClonesController {

    // Constructor de la clase para asignar el contexto a los métodos
    constructor(){
        this.crearClon = this.crearClon.bind(this);
        this.eliminarClon = this.eliminarClon.bind(this);
        this.actualizarClon = this.actualizarClon.bind(this);
        this.ListarClones = this.ListarClones.bind(this);
        this.obtenerClonesConDetalles = this.obtenerClonesConDetalles.bind(this);
    }

    // Método que se encarga de manejar los errores que se puedan presentar en la aplicación
    private manejarError(error: unknown, res: Response): void {
        
        switch (true) {
            case error instanceof NotFoundError:
                res.status(404).json({ error: error.message });
                break;
            case error instanceof DuplicateEntryError:
                res.status(409).json({ error: error.message });
                break;
            case error instanceof DatabaseError:
                res.status(503).json({ error: error.message });
                break;
            case error instanceof DatabaseGenericError:
            case error instanceof BadRequestError:
                res.status(400).json({ error: error.message });
                break;
            default:
                res.status(500).json((error as Error).message);
        }
    }

    // Método que se encarga de crear un clon en la base de datos
    async crearClon(req: Request, res: Response): Promise<void> {
         try {
            const datos = req.body;
            const Clon =  await CrearClon.ejecutar(datos);
            res.status(201).json(Clon);
         } catch (error) {
            this.manejarError(error, res);
         }
    }

    // Método que se encarga de eliminar un clon de la base de datos
    async eliminarClon(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await EliminarClon.ejecutar(id);

            res.status(200).json({message: 'Clon eliminado correctamente'});
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Método que se encarga de actualizar un clon de la base de datos
    async actualizarClon(req: Request, res: Response): Promise<void> {
        try {
            const datos = req.body;
            const id = req.params.id;

            const clon = {
                id: id,
                ...datos
            }

            const clonActualizado = await ActualizarClon.ejecutar(clon);
            res.status(200).json(clonActualizado);
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Método que se encarga de obtener todos los clones de la base de datos

    async ListarClones(req: Request, res: Response): Promise<void> {
        try {
            const datos = req.query;
            const clones = await ListarClones.ejecutar(datos);
            res.status(200).json(clones);
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Método que se encarga de obtener todos los clones con sus detalles de la base de datos
    async obtenerClonesConDetalles(req: Request, res: Response): Promise<void> {
        try {
            const datos = req.query;
            const clones = await ObtenerClonesConDetalles.ejecutar(datos, new ClonesConsultasPersistencia());
            res.status(200).json(clones);
        } catch (error) {
            this.manejarError(error, res);
        }
    }
}