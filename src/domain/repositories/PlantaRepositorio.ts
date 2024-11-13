// Este repositorio se encarga de gestionar las operaciones relacionadas con la entidad Planta en la base de datos.

// Se encarga de la firma de los métodos que se implementarán en el repositorio de la entidad Planta

import { Planta } from "../models/Planta";



export interface PlantaRepositorio {
  almacenarPlanta(planta: Planta): Promise<Planta>; 
  eliminarPlanta(id: string): Promise<void>; 
  listarPlantas(): Promise<Planta[] | null>; 
  buscarPorVariedad(variedad: string): Promise<Planta | null>; 
  buscarPorEspecie(especie: string): Promise<Planta[] | null>; 
  actualizarPlanta(planta: Planta): Promise<Planta>; 
  obtenerPlantaPorId(id: string): Promise<Planta | null>; 
}