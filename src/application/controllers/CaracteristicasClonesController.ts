// Controlador para las caracteristicas de los clones

import { NotFoundError, DuplicateEntryError, DatabaseError, DatabaseGenericError, BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { Request, Response } from "express";
import { CaracteristicasClonDTO } from "../dtos/caracteristicasClon_dto";
import { CrearCaracteristicas } from "../commands/handdlers/caracteristicas/CrearCaracteristica";


export class CaracteristicasClonesController {

    constructor(){
        this.crearCaracteristicas = this.crearCaracteristicas.bind(this);
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

    // Método para crear caracteristicas de clones o actualizarlas si ya existen
    
    async crearCaracteristicas(req: Request, res: Response): Promise<void> {
        try {
            const caracteristicaData: CaracteristicasClonDTO = req.body;
            const caracteristicas = await CrearCaracteristicas.ejecutar(caracteristicaData);
            res.status(201).json(caracteristicas);
        } catch (error) {
            this.manejarError(error, res);
        }
    }
}