import { expect } from "chai";
import request from "supertest";
import { DimensionesDTO } from "../../src/application/dtos/Dimensiones_dto";
import app from "../../src";
import {config} from 'dotenv';

config();

export const dimensionesTest = ({ nombre }) => {
    const apiKey = process.env.API_KEY;
    let dimensionesBase : DimensionesDTO & { id: number };

    describe('Operaciones sobre dimensiones', () => {

        // crear dimensiones sin nombre

        it('Deberia retornar un error al crear dimensiones sin nombre', async () => {
            try {
                const dimensiones = {
                    altura_maxima: "200",
                    diametro: "20",
                    imagenes: {
                        jpg: "url",
                        webp: "url",
                        tiff: "url"
                    }
                };

                const res = await request(app)
                    .post('/api/dimensiones')
                    .set('x-api-key', apiKey!)
                    .send(dimensiones);

                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/dimensiones: ${error}`);
            }
        });

        // crear dimensiones con un nombre que no existe

        it('Deberia retornar un error al crear dimensiones con un nombre que no existe', async () => {
            try {
                const dimensiones = {
                    nombre_clon: "Nombre que no existe",
                    altura_maxima: "200",
                    diametro: "20",
                    imagenes: {
                        jpg: "url",
                        webp: "url",
                        tiff: "url"
                    }
                };

                const res = await request(app)
                    .post('/api/dimensiones')
                    .set('x-api-key', apiKey!)
                    .send(dimensiones);

                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/dimensiones: ${error}`);
            }
        });

        // crear dimensiones 

        it('Deberia crear dimensiones', async () => {
            try {

                const dimensiones = {
                    nombre_clon: nombre,
                    altura_maxima: "200",
                    diametro: "20",
                    imagenes: {
                        jpg: "url",
                        webp: "url",
                        tiff: "url"
                    }
                };

                const res = await request(app)
                    .post('/api/dimensiones-test')
                    .set('x-api-key', apiKey!)
                    .send(dimensiones);

                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('altura_maxima');
                expect(res.body).to.have.property('diametro');
                expect(res.body).to.have.property('imagenes');

                dimensionesBase = res.body;

            } catch (error) {
                throw new Error(`Error en petición POST a /api/dimensiones: ${error}`);
            }
        });

        // actualizar dimensiones con un id que no existe

        it('Deberia retornar un error al actualizar dimensiones con un id que no existe', async () => {
            try {
                const dimensiones = {
                    altura_maxima: "300",
                };

                const res = await request(app)
                    .patch('/api/dimensiones/1000')
                    .set('x-api-key', apiKey!)
                    .send(dimensiones);

                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/dimensiones: ${error}`);
            }
        });

        // actualizar dimensiones con un nombre que no existe

        it('Deberia retornar un error al actualizar dimensiones con un nombre que no existe', async () => {
            try {
                const dimensiones = {
                    nombre_clon: "Nombre que no existe"
                };

                const res = await request(app)
                    .patch(`/api/dimensiones/${dimensionesBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(dimensiones);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/dimensiones: ${error}`);
            }
        });

        // actualizar dimensiones

        it('Deberia actualizar dimensiones', async () => {
            try {
                const dimensiones = {
                    altura_maxima: "300",
                };

                const res = await request(app)
                    .patch(`/api/dimensiones/${dimensionesBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(dimensiones);

                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('altura_maxima');
                expect(res.body).to.have.property('diametro');
                expect(res.body).to.have.property('imagenes');
                expect(res.body).to.be.an('object');

                dimensionesBase = res.body;
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/dimensiones: ${error}`);
            }
        });

    });
};