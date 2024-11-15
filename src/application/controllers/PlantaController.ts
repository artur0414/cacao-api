// Este controlador se encarga de gestionar las peticiones HTTP relacionadas con la entidad Planta y de enviar las respuestas HTTP correspondientes.

// Importaciones de módulos externos
import { Request, Response } from 'express';

// Importaciones de DTOs 
import { PlantaDTO } from '../dtos/planta_dto';

// Importaciones de comandos
import {CrearPlanta, EliminarPlanta, ActualizarPlanta} from '../commands/handdlers/planta';

// Importaciones de consultas
import { ListarPlantas, ObtenerPlantasConClones, ObtenerPlantasConClonesDetalles, ObtenerPlantasEstadisticas } from '../queries/handdlers/plantas';

// Importaciones de errores personalizados
import {BadRequestError, DuplicateEntryError, NotFoundError, DatabaseGenericError, DatabaseError } from '../../infrastructure/errors/CustomErrors';
import { PlantaDetallesConsultas } from '../../infrastructure/persistence/planta/PlantaDetallesConsultas';


// Controlador de la entidad Planta
export class PlantaController {

    // Constructor del controlador de la entidad Planta que enlaza los métodos con la instancia de la clase PlantaController 
    constructor() {
        this.crearPlanta = this.crearPlanta.bind(this);
        this.eliminarPlanta = this.eliminarPlanta.bind(this);
        this.listarPlantas = this.listarPlantas.bind(this);
        this.actualizarPlanta = this.actualizarPlanta.bind(this);
        this.obtenerPlantasConClones = this.obtenerPlantasConClones.bind(this);
        this.otenerPlantasConClonesDetalles = this.otenerPlantasConClonesDetalles.bind(this);
        this.obtenerEstadisticasPlantas = this.obtenerEstadisticasPlantas.bind(this);
    }

    // Maneja errores personalizados y envía respuestas adecuadas
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
   
    // Maneja la creación de una nueva planta
    async crearPlanta(req: Request, res: Response): Promise<void> {
        try {
            const plantaData: PlantaDTO = req.body;
            const planta = await CrearPlanta.ejecutar(plantaData);
            res.status(201).json(planta);
        } catch (error) {
            this.manejarError(error, res);
        }
    }
    
    // Elimina una planta por ID
    async eliminarPlanta(req:Request, res:Response) : Promise<void>{
        try {
            const id = req.params.id;
            await EliminarPlanta.ejecutar(id)

            res.status(200).json({message: 'Planta eliminada correctamente'})
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Devuelve una lista de plantas filtradas por especie, variedad o ID
    async listarPlantas(req: Request, res: Response): Promise<void> {
        try {
            const datos = req.query;
            const plantas = await ListarPlantas.ejecutar(datos);
            res.status(200).json(plantas);
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Actualiza una planta existente por ID
    async actualizarPlanta(req: Request, res: Response): Promise<void> {
        try {
            const datos = req.body;
            const id = req.params.id;

            const planta = {id,...datos}
            const plantaActualizada = await ActualizarPlanta.ejecutar(planta);
            res.status(200).json(plantaActualizada);
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Obtiene todas las plantas con sus clones sin tablas relacionadas de clones
    async obtenerPlantasConClones(req: Request, res: Response): Promise<void> {
        try {
            const valores = req.query;
            const plantasConClones = await ObtenerPlantasConClones.ejecutar(valores);

            res.status(200).json(plantasConClones);
        } catch (error) {
            this.manejarError(error, res);
        }
    }
    
    // Obtiene todas las plantas con sus clones con tablas relacionadas de clones
    async otenerPlantasConClonesDetalles(req: Request, res: Response): Promise<void> {
        try {
            const valores = req.query;
            const plantasConClones = await ObtenerPlantasConClonesDetalles.ejecutar(valores, new PlantaDetallesConsultas());

            res.status(200).json(plantasConClones);
        } catch (error) {
            this.manejarError(error, res);
        }
    }

    // Obtiene estadísticas de plantas por especie o variedad
    async obtenerEstadisticasPlantas(req: Request, res: Response): Promise<void> {
        try {
            const valores = req.query;
            const estadisticas = await ObtenerPlantasEstadisticas.ejecutar(valores);

            res.status(200).json(estadisticas);
        } catch (error) {
            this.manejarError(error, res);
        }
    }
}