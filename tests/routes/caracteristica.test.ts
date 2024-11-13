import { CaracteristicasClonDTO } from "../../src/application/dtos/caracteristicasClon_dto";
import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import {config} from 'dotenv';

config();

export const caracteristicaTest = ({nombre}) => {

    const apiKey = process.env.API_KEY;

    let caracteristica : CaracteristicasClonDTO & { id: number };

    describe('Operaciones sobre caracteristicas y filtros', () => {


        // crear caracteristicas sin clon existente

        it('Deberia retornar un error al crear una caracteristica sin clon existente', async () => {
            try {
                const caracteristicas = {
                    nombre_clon: "Clon inexistente",
                    caracteristicas: ["descripcion de prueba", "descripcion de prueba"],
                };

                const res = await request(app)
                    .put('/api/caracteristicas')
                    .set('x-api-key', apiKey!) // Aquí agregamos la API Key en los headers
                    .send(caracteristicas);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PUT a /api/caracteristica: ${error}`);
            }
        });

        // crear caracteristicas

        it('Deberia crear una caracteristica', async () => {
            try {

                const caracteristicas = {
                    nombre_clon: nombre,
                    caracteristicas: ["descripcion de prueba", "descripcion de prueba"],
                };

                const res = await request(app)
                    .put('/api/caracteristicas')
                    .set('x-api-key', apiKey!)
                    .send(caracteristicas);

                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('caracteristicas');
                expect(res.body).to.have.property('id')
                expect(res.body.caracteristicas).to.be.an('array');

                caracteristica = res.body;
            } catch (error) {
                throw new Error(`Error en petición PUT a /api/caracteristica: ${error}`);
            }
        });

        // Acutalizar caracteristicas sin array de caracteristicas Error de validación de datos

        it('Deberia retornar un error al actualizar una caracteristica sin array de caracteristicas', async () => {
            try {
                const caracteristicas = {
                    nombre_clon: nombre,
                };

                const res = await request(app)
                    .put('/api/caracteristicas')
                    .set('x-api-key', apiKey!)
                    .send(caracteristicas);

                expect(res.status).to.equal(400)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PUT a /api/caracteristica: ${error}`);
            }
        });

        // actualizar caracteristicas

        it('Deberia actualizar una caracteristica', async () => {
            try {
                const caracteristicas = {
                    nombre_clon: nombre,
                    caracteristicas: ["descripcion de prueba actualizada", "descripcion de prueba actualizada"],
                };

                const res = await request(app)
                    .put('/api/caracteristicas')
                    .set('x-api-key', apiKey!)
                    .send(caracteristicas);

                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('caracteristicas');
                expect(res.body).to.have.property('id')
                expect(res.body.caracteristicas).to.be.an('array');
            } catch (error) {
                throw new Error(`Error en petición PUT a /api/caracteristica: ${error}`);
            }
        });

    });
}