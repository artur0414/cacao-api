// Este es el modelo de la entidad Planta, que se encarga de gestionar los datos de las plantas. La clase Planta tiene métodos para obtener y cambiar la especie y variedad de la planta, así como para obtener el ID de la planta. También tiene un método privado para validar los campos de la planta. La clase Planta utiliza los value objects validarEspeciePlanta y validarVariedadPlanta para validar la especie y variedad de la planta, respectivamente. Si se produce un error de validación, se lanza un error BadRequestError.

import { BadRequestError } from "../../infrastructure/errors/CustomErrors"; // Se importa el error personalizado BadRequestError
import { validarParcialValueObjectPlanta } from "../value-objects/plantaValueObjectValidation";

// Define el tipo para el valor y el validador
interface CampoValidable {
  valor: {
    [key: string]: string; 
  }
  validador: (valor: any) => { success: boolean; error?: any };
};

// Clase que representa una planta
export class Planta {
  constructor(
    private especie: string,
    private variedad: string,
    private id ?: string,
  ) { // Inicializar clones como un arreglo vacío si no se proporciona
  }

  // Métodos para obtener y cambiar la especie y variedad de la planta
  obtenerEspecie(): string {
    this.validarCampo({ valor: {especie: this.especie}, validador: validarParcialValueObjectPlanta });
    return this.especie;
  }

  // Método para obtener la variedad de la planta
  obtenerVariedad(): string {
    this.validarCampo({ valor: {variedad : this.variedad}, validador: validarParcialValueObjectPlanta });
    return this.variedad;
  }

  // Método para obtener el ID de la planta
  obtenerId(): string | undefined {
    return this.id;
  }

  // Métodos para cambiar la especie y variedad de la planta
  cambiarEspecie(nuevaEspecie: string): void {
    this.validarCampo({ valor: {especie: nuevaEspecie}, validador: validarParcialValueObjectPlanta });
    this.especie = nuevaEspecie;
  }

  // Método para cambiar la variedad de la planta
  cambiarVariedad(nuevaVariedad: string): void {
    this.validarCampo({ valor: {especie: nuevaVariedad}, validador: validarParcialValueObjectPlanta });
    this.variedad = nuevaVariedad;
  }

  // Método privado para validar los campos de la planta
  private validarCampo({ valor, validador }: CampoValidable): void {
    const resultado = validador(valor);
    if (!resultado.success) {
      throw new BadRequestError(resultado.error.errors[0].message);
    }
  }
}