// Controlador para crear y actualizar condiciones climáticas

import { NotFoundError, DuplicateEntryError, DatabaseError, DatabaseGenericError, BadRequestError } from "../../infrastructure/errors/CustomErrors";

import { Request, Response } from "express";
import { CrearCondicionesClimaticas } from "../commands/handdlers/condiciones climaticas/CrearCondicionesClimaticas";
import { ActualizarCondicionesClimaticas } from "../commands/handdlers/condiciones climaticas/ActualizarCondicionesClimaticas";
import { CondicionesClimaticas } from "../../domain/models/CondicionesClimaticas";


export class CondicionesClimaticasController {
    constructor(){
        this.crearCondicionesClimaticas = this.crearCondicionesClimaticas.bind(this);
        this.actualizarCondicionesClimaticas = this.actualizarCondicionesClimaticas.bind(this);
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

    // Método para crear condiciones climáticas
    async crearCondicionesClimaticas(req: Request, res: Response): Promise<void> {
        try {
            const condicionesClimaticas = req.body;
            const condicionesClimaticasCreadas = await CrearCondicionesClimaticas.ejecutar(condicionesClimaticas);
            res.status(201).json(condicionesClimaticasCreadas);
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Método para actualizar condiciones climáticas
    async actualizarCondicionesClimaticas(req: Request, res: Response) : Promise<void> {
        try {
            const condicionesClimaticas = req.body;
            const id = req.params.id;

            const datos = {
                id,
                ...condicionesClimaticas
            }

            const condicionesClimaticasActualizadas = await ActualizarCondicionesClimaticas.ejecutar(datos);
            res.status(200).json(condicionesClimaticasActualizadas);
        } catch (error) {
            this.manejarError(error, res);
        }
    }    
}