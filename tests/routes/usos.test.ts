import { expect } from 'chai';
import request from 'supertest';
import app from "../../src";
import { UsosDTO } from '../../src/application/dtos/usos_dto';
import { config } from 'dotenv';

config();

export const usosTest = ({ nombre }) => {
    const apiKey = process.env.API_KEY;
    let usosBase: UsosDTO & { id: number };

    describe('Operaciones sobre usos', () => {

        // crear con formato incorrecto de nombre 

        it('Deberia retornar un error al crear usos con un nombre incorrecto', async () => {
            try {
                const usos = {
                    nombre_clon: "Nombre que no existe",
                    usos: ["uso 1", "uso 2"],
                    expansion_geografica: ["expansion geografica"],
                };

                const res = await request(app)
                    .post('/api/usos')
                    .set('x-api-key', apiKey!)
                    .send(usos);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/usos: ${error}`);
            }
        });

        // crear usos

        it('Deberia crear usos', async () => {
            try {
                const usos = {
                    nombre_clon: nombre,
                    usos: ["uso 1", "uso 2"],
                    expansion_geografica: ["colombia", "argentina"],
                };

                const res = await request(app)
                    .post('/api/usos')
                    .set('x-api-key', apiKey!)
                    .send(usos);

                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                usosBase = res.body;
            } catch (error) {
                throw new Error(`Error en petición POST a /api/usos: ${error}`);
            }
        });

        // actualizar usos con nombre incorrecto

        it('Deberia retornar un error al actualizar usos con un nombre incorrecto', async () => {
            try {
                const usos = {
                    nombre_clon: "Nombre que no-existe",
                };

                const res = await request(app)
                    .patch(`/api/usos/${usosBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(usos);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición patch a /api/usos: ${error}`);
            }
        });

        // actualizar usos con formato incorrecto de usos.usos 

        it('Deberia retornar un error al actualizar usos con formato incorrecto de usos.usos', async () => {
            try {
                const usos = {
                    usos: "uso 1",
                };

                const res = await request(app)
                    .patch(`/api/usos/${usosBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(usos);

                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición patch a /api/usos: ${error}`);
            }
        });

        // actualizar usos

        it('Deberia actualizar usos', async () => {
            try {
                const usos = {
                    usos: ["uso 1", "uso 2"],
                    expansion_geografica: ["colombia", "argentina"],
                };

                const res = await request(app)
                    .patch(`/api/usos/${usosBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(usos);

                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
            } catch (error) {
                throw new Error(`Error en petición patch a /api/usos: ${error}`);
            }
        });

    });
}

