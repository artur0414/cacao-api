// Tests unitarios para las rutas de la API

import { config } from 'dotenv';
config(); // Esto asegura que las variables de entorno se cargan al inicio


import request from 'supertest';
import app from '../../src/index';
import { plantaTest } from './planta.test';
import { clonTest } from './clon.test';
import { caracteristicaTest } from './caracteristica.test';
import { PlantaDTO } from '../../src/application/dtos/planta_dto';
import { ClonDTO } from '../../src/application/dtos/clon_dto';
import { condicionesClimaticasTest } from './CondicionesClimaticas.test';
import { dimensionesTest } from './dimensiones.test';
import { mantenimientoTest } from './mantenimiento.test';
import { plagasEnfermedadesTest } from './plagasEnfermedades.test';
import { usosTest } from './usos.test';

const apiKey = process.env.API_KEY;

describe('pruebas Api', () => {

    
    let plantaBase : PlantaDTO & { id: number };
    let clonBase : ClonDTO & { id: number };

    // Crea planta y clon antes de las pruebas
    before(async () => {
        const planta = {
            especie: "Especie de prueba",
            variedad: "Variedad de prueba",
        };
    
        const clon = {
            nombre_clon: "Clon de prueba",
            variedad: "Variedad de prueba",
            origen: "Imagen de prueba",
            descripcion: "Descripción de prueba",
        };

        // Crear planta
        const res = await request(app)
            .post('/api/plantas')
            .set('x-api-key', apiKey!)
            .send(planta);
    
        plantaBase = res.body;
    
        if (res.status === 201) {
            // Crear clon solo si la planta se creó correctamente
            const res2 = await request(app)
                .post('/api/clon') // Asegúrate de que la ruta sea /api/clon, no /api/clones
                .set('x-api-key', apiKey!)
                .send(clon);

                if (res2.status === 201) {
                    clonBase = res.body;
                } else {
                    throw new Error(`Error al crear clon: ${JSON.stringify(res2.body)}`);
                }
        } else {
            throw new Error(`Error al crear planta: ${res.body}`);
        }
    });
    
    // Crud Planta
    plantaTest()
    
    // Crud Clon
    clonTest({variedad: "Variedad de prueba"})
    
    // Crud Caracteristica
    caracteristicaTest({nombre: "Clon de prueba"});

    // Crud Condiciones Climaticas
    condicionesClimaticasTest({nombre: "Clon de prueba"});

    // Crud Dimensiones 

    dimensionesTest({nombre: "Clon de prueba"});


    // Crud mantenimiento 

    mantenimientoTest({nombre: "Clon de prueba"});

    // Crud plagas y enfermedades

    plagasEnfermedadesTest({nombre: "Clon de prueba"});

    // Crud Usos 

    usosTest({nombre: "Clon de prueba"});

    
    // Eliminar lo que se haya creado en las pruebas
    after(async () => {
        try {
            // Eliminar clon
            await request(app)
                .delete(`/api/clon/${clonBase.id}`)
                .set('x-api-key', apiKey!)
    
            // Eliminar planta
            await request(app)
                .delete(`/api/plantas/${plantaBase.id}`)
                .set('x-api-key', apiKey!)

        } catch (error) {
            throw new Error(`Error al eliminar recursos creados en las pruebas: ${error}`);
        }
    });
});
