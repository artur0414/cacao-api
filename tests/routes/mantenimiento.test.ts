import { expect } from 'chai';
import request from 'supertest';
import app from "../../src";
import { MantenimientoDTO } from '../../src/application/dtos/mantenimiento_dto';
import { config } from 'dotenv';

config();

export const mantenimientoTest = ({ nombre }) => {

    const apiKey = process.env.API_KEY;

    let mantenimientoBase: MantenimientoDTO & { id: number };

    describe('Operaciones sobre mantenimiento', () => {
        // crear mantenimiento sin nombre
        it('Deberia retornar un error al crear mantenimiento sin nombre', async () => {
            try {
                const mantenimiento = {
                    tipo_abonos: ["abono 1", "abono 2"],
                    frecuencia_podas: "una vez al mes",
                };

                const res = await request(app)
                    .post('/api/mantenimiento')
                    .set('x-api-key', apiKey!)
                    .send(mantenimiento);

                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/mantenimiento: ${error}`);
            }
        });

        // crear mantenimiento con un nombre que no existe

        it('Deberia retornar un error al crear mantenimiento con un nombre que no existe', async () => {
            try {
                const mantenimiento = {
                    nombre_clon: "Nombre que no existe",
                    tipo_abonos: ["abono 1", "abono 2"],
                    frecuencia_podas: "una vez al mes",
                };

                const res = await request(app)
                    .post('/api/mantenimiento')
                    .set('x-api-key', apiKey!)
                    .send(mantenimiento);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/mantenimiento: ${error}`);
            }
        });

        // crear mantenimiento 

        it('Deberia crear mantenimiento', async () => {
            try {
                const mantenimiento = {
                    nombre_clon: nombre,
                    tipo_abonos: ["abono 1", "abono 2"],
                    frecuencia_podas: "una vez al mes"
                };

                const res = await request(app)
                    .post('/api/mantenimiento')
                    .set('x-api-key', apiKey!)
                    .send(mantenimiento);

                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('tipo_abonos');
                expect(res.body).to.have.property('frecuencia_podas');

                mantenimientoBase = res.body;
            } catch (error) {
                throw new Error(`Error en petición POST a /api/mantenimiento: ${error}`);
            }
        });

        // Actualizar mantenimiento

        it('Deberia actualizar mantenimiento', async () => {
            try {
                const mantenimiento = {
                    tipo_abonos: ["abono 1", "abono 2"],
                    frecuencia_podas: "una vez al mes",
                };

                const res = await request(app)
                    .patch(`/api/mantenimiento/${mantenimientoBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(mantenimiento);

                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('tipo_abonos');
                expect(res.body).to.have.property('frecuencia_podas');
            } catch (error) {
                throw new Error(`Error en petición Patch a /api/mantenimiento: ${error}`);
            }
        });

        // Actualizar mantenimiento con un nombre que no existe

        it('Deberia retornar un error al actualizar mantenimiento con un nombre que no existe', async () => {
            try {
                const mantenimiento = {
                    nombre_clon: "Nombre que no existe",
                };

                const res = await request(app)
                    .patch(`/api/mantenimiento/${mantenimientoBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(mantenimiento);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PUT a /api/mantenimiento: ${error}`);
            }
        });

        // Actualizar mantenimiento con un id que no existe

        it('Deberia retornar un error al actualizar mantenimiento con un id que no existe', async () => {
            try {
                const mantenimiento = {
                    tipo_abonos: ["abono 1", "abono 2"],
                };

                const res = await request(app)
                    .patch(`/api/mantenimiento/0`)
                    .set('x-api-key', apiKey!)
                    .send(mantenimiento);

                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PUT a /api/mantenimiento: ${error}`);
            }
        });

        // Actualizar mantenimiento con un formato en tipo_abonos incorrecto

        it('Deberia retornar un error al actualizar mantenimiento con un formato en tipo_abonos incorrecto', async () => {
            try {
                const mantenimiento = {
                    tipo_abonos: "abono 1",
                };

                const res = await request(app)
                    .patch(`/api/mantenimiento/${mantenimientoBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(mantenimiento);

                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PUT a /api/mantenimiento: ${error}`);
            }
        });

    });
};