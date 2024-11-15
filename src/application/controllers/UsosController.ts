// Controlador para la entidad Usos

import { Request, Response } from 'express';
import { NotFoundError, DuplicateEntryError, DatabaseError, DatabaseGenericError, BadRequestError } from '../../infrastructure/errors/CustomErrors';
import { CrearUsos, ActualizarUsos } from '../commands/handdlers/usos';


export class UsosController {
    constructor() {
        this.crearUsos = this.crearUsos.bind(this);
        this.actualizarUsos = this.actualizarUsos.bind(this);
    }

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

    // Método para crear usos
    async crearUsos(req: Request, res: Response) : Promise<void> {
        try {
            const usos = req.body;
            const usosCreados = await CrearUsos.ejecutar(usos);
            res.status(201).json(usosCreados);
        } catch (error) {
            return this.manejarError(error, res);
        }
    }

    // Método para actualizar usos
    async actualizarUsos(req: Request, res: Response) : Promise<void> {
        try {
            const usos = req.body;
            const id = req.params.id;
            const datos = { ...usos, id };
            const usosActualizados = await ActualizarUsos.ejecutar(datos);
            res.status(200).json(usosActualizados);
        } catch (error) {
            return this.manejarError(error, res);
        }
    }
}