// Este archivo define la entidad que representa una planta en la base de datos y sirve como modelo para la persistencia de la misma. 


export class PlantaEntity {
    
    constructor(
        public especie: string,
        public variedad: string,
        public _id?: string,
      ) {
      }
      
    getEspecie(): string {
        return this.especie ;
    }

    getVariedad(): string {
        return this.variedad ;
    }

    getId(): string | undefined {
        return this._id;
    }

}