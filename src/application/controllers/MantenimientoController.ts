// Controlador de mantenimiento de clones

import { NotFoundError, DuplicateEntryError, DatabaseError, DatabaseGenericError, BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { ActualizarMantenimiento } from "../commands/handdlers/mantenimiento/ActualizarMantenimiento";
import { CrearMantenimiento } from "../commands/handdlers/mantenimiento/CrearMantenimiento";
import { Request, Response } from "express";


export class MantenimientoController {
    constructor(){
        this.crearMantenimiento = this.crearMantenimiento.bind(this);
        this.actualizarMantenimiento = this.actualizarMantenimiento.bind(this);
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

    // Método para crear un mantenimiento
    async crearMantenimiento(req: Request, res: Response): Promise<void> {
        try {
            const mantenimiento = req.body;
            const mantenimientoCreado = await CrearMantenimiento.ejecutar(mantenimiento);
            res.status(201).json(mantenimientoCreado);
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Método para actualizar un mantenimiento
    async actualizarMantenimiento(req: Request, res: Response): Promise<void> {
        try {
            const mantenimiento = req.body;
            const id = req.params.id;
            const datos = {
                id,
                ...mantenimiento
            }
            const mantenimientoActualizado = await ActualizarMantenimiento.ejecutar(datos);
            res.status(200).json(mantenimientoActualizado);
        } catch (error) {
            this.manejarError(error, res);
        }
    }
}