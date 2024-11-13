// Controlador de las dimensiones de los clones

import { NotFoundError, DuplicateEntryError, DatabaseError, DatabaseGenericError, BadRequestError } from "../../infrastructure/errors/CustomErrors";
import { Request, Response } from "express";
import { CrearDimensiones } from "../commands/handdlers/dimensiones/CrearDimensiones";
import { ImageManager } from "../services/ImageManager";
import { ActualizarDimensiones } from "../commands/handdlers/dimensiones/ActualizarDimensiones";


export class DimensionesController {
    constructor() {
        this.crearDimensiones = this.crearDimensiones.bind(this);
        this.actualizarDimensiones = this.actualizarDimensiones.bind(this);
        this.actualizarImagenes = this.actualizarImagenes.bind(this);
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

    // Método para crear dimensiones
    async crearDimensiones(req: Request, res: Response) : Promise<void> {
        try {
            let dimensiones = req.body
            const dimensionesCreadas = await CrearDimensiones.ejecutar(dimensiones);
            res.status(201).json(dimensionesCreadas);

        } catch (error) {
            const eliminarImagen = new ImageManager();
            const imagenesEliminadas = await eliminarImagen.eliminarImagenes(req.body.urlName);
            if(imagenesEliminadas) {
                console.log('Imagenes eliminadas correctamente');
            }
            return this.manejarError(error, res);
        }
    }

    // Método para actualizar dimensiones
    async actualizarDimensiones(req: Request, res: Response) : Promise<void> {
        try {
            const dimensiones = req.body;
            const id = req.params.id;

            const datos = { id, ...dimensiones };

            const DimensionesActializadas =  await ActualizarDimensiones.actualizarDimensiones(datos);

            res.status(201).json(DimensionesActializadas);
        } catch (error) {
            return this.manejarError(error, res);
        }
    }

    // Método para actualizar imágenes
    async actualizarImagenes(req: Request, res: Response) : Promise<void> {
        try {
            const dimensiones = req.body;
            const imagenesActualizadas = await ActualizarDimensiones.actualizarImagenes(dimensiones);
            res.status(201).json(imagenesActualizadas);
        } catch (error) {
            const eliminarImagen = new ImageManager();
            await eliminarImagen.eliminarImagenes(req.body.urlName);
            return this.manejarError(error, res);
        }
    }
}