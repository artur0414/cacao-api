// Controlador de Plagas y Enfermedades

import { Request, Response } from 'express';
import { NotFoundError, DuplicateEntryError, DatabaseError, DatabaseGenericError, BadRequestError } from '../../infrastructure/errors/CustomErrors';
import { CrearPlagasEnfermedades } from '../commands/handdlers/plagas enfermedades/CrearPlagasEnfermedades';
import { ActualizarPlagasEnfermedades } from '../commands/handdlers/plagas enfermedades/ActualizarPlagasEnfermedades';


export class PlagasEnfermedadesController {
    constructor() {
        this.crearPlagasEnfermedades = this.crearPlagasEnfermedades.bind(this);
        this.actualizarPlagasEnfermedades = this.actualizarPlagasEnfermedades.bind(this);
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

    // Método para crear plagas y enfermedades
    async crearPlagasEnfermedades(req: Request, res: Response): Promise<void> {
        try {
            const plagasEnfermedades = req.body;
            const plagasEnfermedadesCreadas = await CrearPlagasEnfermedades.ejecutar(plagasEnfermedades);
            res.status(201).json(plagasEnfermedadesCreadas);
        } catch (error) {
            return this.manejarError(error, res);
        }
    }

    // Método para actualizar plagas y enfermedades
    async actualizarPlagasEnfermedades(req: Request, res: Response): Promise<void> {
        try {
            const plagasEnfermedades = req.body;
            const id = req.params.id;
            const datos = { ...plagasEnfermedades, id };
            const plagasEnfermedadesActualizadas = await ActualizarPlagasEnfermedades.ejecutar(datos);
            res.status(200).json(plagasEnfermedadesActualizadas);
        } catch (error) {
            return this.manejarError(error, res);
        }
    }
}