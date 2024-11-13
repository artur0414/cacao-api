import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import { ClonDTO } from '../../src/application/dtos/clon_dto';
import {config} from 'dotenv';

config()

export const clonTest = ({ variedad }) => {
    const apiKey = process.env.API_KEY;
    let clonParcial : ClonDTO & { id: number };

    // Función auxiliar para realizar peticiones GET y verificar respuestas comunes
    const checkGetRequest = async (endpoint: string, params: object) => {
        try {
            const res = await request(app).get(endpoint).query(params);

            res.status === 200 ? expect(res.status).to.equal(200) : expect(res.status).to.equal(404 );
            Array.isArray(res.body) ? expect(res.body).to.be.an('array') : expect(res.body).to.be.an('object');
        } catch (error) {
            throw new Error(`Error en petición GET a ${endpoint}: ${error}`);
        }
    };

    describe('Operaciones sobre clones y filtros', () => {
        
        // 1. Crear un clon
        it('Debería crear un clon', async () => {
            const clon = {
                nombre_clon: "Clon de prueba 2",
                variedad: variedad,
                origen: "Origen de prueba",
                descripcion: "Descripción de prueba",
            };

            const res = await request(app)
                .post('/api/clon')
                .set('x-api-key', apiKey!)
                .send(clon);

            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('nombre_clon');
            expect(res.body).to.have.property('variedad');
            expect(res.body).to.have.property('origen');
            expect(res.body).to.have.property('descripcion');

            clonParcial = res.body; // Guardamos el clon creado
        });

        // Obtener todos los clones (sin filtros)
        it('Debería retornar todos los clones', async () => {
            await checkGetRequest('/api/clon', {});
        });

        // Obtener clones filtrados por variedad
        it('Debería retornar clones filtrados por variedad', async () => {
            await checkGetRequest('/api/clon', { variedad });
        });

        // Obtener clones filtrados por nombre de clon
        it('Debería retornar clones filtrados por nombre de clon', async () => {
            await checkGetRequest('/api/clon', { nombre_clon: 'Clon de prueba' });
        });

        // Obtener clones filtrados por id

        it('Debería retornar clones filtrados por id', async () => {
            await checkGetRequest('/api/clon', { id: clonParcial.id });
        });


        // Obtener clones con detalles sin filtros (todos los clones)
        it('Debería retornar todos los clones con detalles si no se pasa filtro', async () => {
            await checkGetRequest('/api/clon/detalles', {});
        });

        // Obtener clones con detalles filtrados por variedad

        it('Debería retornar clones con detalles filtrados por variedad', async () => {
            await checkGetRequest('/api/clon/detalles', { variedad });
        });

        // Obtener clones con detalles filtrados por nombre de clon

        it('Debería retornar clones con detalles filtrados por nombre de clon', async () => {
            await checkGetRequest('/api/clon/detalles', { nombre_clon: clonParcial.nombre_clon });
        });

        // Obtener clones con detalles filtrados por característica

        it('Debería retornar clones con detalles filtrados por característica', async () => {
            await checkGetRequest('/api/clon/detalles', { caracteristica: 'Característica de prueba' });
        });

        // Obtener clones con detalles filtrados por uso

        it('Debería retornar clones con detalles filtrados por uso', async () => {
            await checkGetRequest('/api/clon/detalles', { uso: 'Uso de prueba' });
        });

        // Obtener clones con detalles filtrados por exposición geográfica

        it('Debería retornar clones con detalles filtrados por exposición geográfica', async () => {
            await checkGetRequest('/api/clon/detalles', { expogeo: 'Exposición geográfica de prueba' });
        });

        // Obteniendo clones con detalles filtrados por id

        it('Debería retornar clones con detalles filtrados por id', async () => {
            await checkGetRequest('/api/clon/detalles', { id: clonParcial.id });
        });

        // Obtener clones con detalles por paginación y límite

        it('Debería retornar clones con detalles por paginación y límite', async () => {
            await checkGetRequest('/api/clon/detalles', { page: 1, limit: 2 });
        });

        // obtener todos los clones con detalles por límite

        it('Debería retornar todos los clones por límite', async () => {
            await checkGetRequest('/api/clon', { limit: 2 });
        });

        // Actualizar un clon
        it('Debería actualizar un clon', async () => {
            const clon = {
                origen: "Origen actualizado",
                descripcion: "Descripción actualizada",
            };

            const res = await request(app)
                .patch(`/api/clon/${clonParcial.id}`)
                .set('x-api-key', apiKey!)
                .send(clon);

            expect(res.status).to.equal(200);
        });

        // Caso de querer actualizar un clon que existe con una variedad que no existe

        it('Debería retornar un error al actualizar un clon con una variedad que no existe', async () => {
            const clon = {
                variedad: 'Variedad que no existe',
            };

            const res = await request(app)
                .patch(`/api/clon/${clonParcial.id}`)
                .set('x-api-key', apiKey!)
                .send(clon);

            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error').that.equals('La variedad proporcionada no existe');
        });

        // caso de crear un clon con la variedad que no existe

        it('Debería retornar un error al crear un clon con una variedad que no existe', async () => {
            const clon = {
                nombre_clon: "Clon de pruebaaaaa",
                variedad: 'Variedad que no existe',
                origen: "Origen de prueba",
                descripcion: "Descripción de prueba",
            };

            const res = await request(app)
                .post('/api/clon')
                .set('x-api-key', apiKey!)
                .send(clon);

            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error').that.equals('La variedad proporcionada no existe');
        });


        //  Eliminar un clon (Última prueba)
        it('Debería eliminar un clon', async () => {
            const res = await request(app)
                .delete(`/api/clon/${clonParcial.id}`)
                .set('x-api-key', apiKey!)

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message').that.equals('Clon eliminado correctamente');
        });
    });
};
