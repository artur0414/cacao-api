import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import { PlantaDTO } from '../../src/application/dtos/planta_dto';
import { config } from 'dotenv';

config();

export const plantaTest = ({nombre}) => {
    const apiKey = process.env.API_KEY;
    let plantaParcial: PlantaDTO & { id: string };

    // Crear la planta antes de ejecutar las pruebas
    before(async () => {
        const planta = {
            especie: "Especie de prueba",
            variedad: "Elliot",
        };

        const res = await request(app)
            .post('/api/plantas')
            .set('x-api-key', apiKey!)
            .send(planta);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('especie');
        expect(res.body).to.have.property('variedad');

        // Asignar la planta creada a la variable plantaParcial
        plantaParcial = res.body;
    });

    // Función auxiliar para hacer peticiones GET y verificar respuestas comunes
    const checkGetRequest = async (endpoint: string, params: object) => {
        try {
            const res = await request(app).get(endpoint).query(params);
            expect(res.status).to.equal(200);

            Array.isArray(res.body) ? expect(res.body).to.be.an('array') : expect(res.body).to.be.an('object');
            
        } catch (error) {
            throw new Error(`Error en petición GET a ${endpoint}: ${error}`);
        }
    };

    describe('Probando endpoints de Planta', () => {

        it('Retornará todas las plantas', async () => {
            await checkGetRequest('/api/plantas', {});
        });

        it('Retornará una planta por variedad', async () => {
            await checkGetRequest('/api/plantas', { variedad: plantaParcial.variedad });
        });

        it('Retornará una planta por id', async () => {
            await checkGetRequest('/api/plantas', { id: plantaParcial.id });
        });

        it('Retornará una planta por especie', async () => {
            await checkGetRequest('/api/plantas', { especie: plantaParcial.especie });
        });

        it('Retornará todas las plantas con sus clones', async () => {
            await checkGetRequest('/api/plantas/clones', {});
        });

        it('Retornará plantas con clones filtradas por nombre de clon', async () => {
            await checkGetRequest('/api/plantas/clones', { nombre_clon: nombre });
        });

        it('Retornará plantas con clones filtradas por variedad', async () => {
            await checkGetRequest('/api/plantas/clones', { variedad: plantaParcial.variedad });
        });

        it('Retornará plantas con clones filtradas por especie', async () => {
            await checkGetRequest('/api/plantas/clones', { especie: plantaParcial.especie });
        });

        it('Retornará todas las plantas con clones y detalles', async () => {
            await checkGetRequest('/api/plantas/clones/detalles', {});
        });

        it('Retornará plantas con clones y detalles filtradas por variedad', async () => {
            await checkGetRequest('/api/plantas/clones/detalles', { variedad: plantaParcial.variedad });
        });

        it('Retornará plantas con clones y detalles filtradas por especie', async () => {
            await checkGetRequest('/api/plantas/clones/detalles', { especie: plantaParcial.especie });
        });

        it('Retornará plantas con clones y detalles filtradas por nombre de clon', async () => {
            await checkGetRequest('/api/plantas/clones/detalles', { nombre_clon: nombre });
        });

        it('Retornará plantas con clones filtradas por límite y página', async () => {
            await checkGetRequest('/api/plantas/clones', { limit: 1, page: 1 });
        });

        it('Retornará plantas con clones y detalles filtradas por característica', async () => {
            await checkGetRequest('/api/plantas/clones/detalles', { caracteristica: 'fuerte' });
        });

        it('Retornará plantas con clones y detalles filtradas por usos', async () => {
            await checkGetRequest('/api/plantas/clones/detalles', { usos: 'chocolateria' });
        });

        it('Retornará plantas y estadísticas por especie', async () => {
            await checkGetRequest('/api/plantas/estadisticas', { especie: plantaParcial.especie });
        });

        it('Retornará plantas y estadísticas por variedad', async () => {
            const res = await request(app).get('/api/plantas/estadisticas').query({ variedad: plantaParcial.variedad });
            expect(res.status).to.equal(400); // Se espera un 400, porque no hay clones asociados a la planta
            expect(res.body).to.be.an('object');
        });

        it('Retornará plantas y clones por expogeo', async () => {
            await checkGetRequest('/api/plantas/clones/detalles', { expogeo: 'colombia' });
        });

        // Prueba de actualización
        it('Actualizará una planta', async () => {
            try {
                const planta = {
                    especie: "Especie actualizada",
                    variedad: "Variedad actualizada",
                };
    
                const res = await request(app)
                    .patch(`/api/plantas/${plantaParcial.id}`)
                    .set('x-api-key', apiKey!)
                    .send(planta);
    
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('especie');
                expect(res.body).to.have.property('variedad');
            } catch (error) {
                throw new Error(`Error al actualizar la planta: ${error}`);
            }
        });

        // Prueba de eliminación
        it('Eliminará una planta', async () => {
            try {
                const res = await request(app)
                .delete(`/api/plantas/${plantaParcial.id}`)
                .set('x-api-key', apiKey!)

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
            } catch (error) {
                throw new Error(`Error al eliminar la planta: ${error}`);
            }
        });
        
    });
};
