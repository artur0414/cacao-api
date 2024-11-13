import { expect } from 'chai';
import request from 'supertest';
import app from "../../src";
import { PlagasEnfermedadesDTO } from '../../src/application/dtos/PlagasEnfermedades_dto';
import { config } from 'dotenv';

config();

export const plagasEnfermedadesTest = ({ nombre }) => {
    const apiKey = process.env.API_KEY;
    let plagasEnfermedadesBase: PlagasEnfermedadesDTO & { id: number };

    describe('Operaciones sobre plagas y enfermedades', () => {

        // crear plagas enfermedades con nombre incorrecto

        it('Deberia retornar un error al crear plagas y enfermedades con un nombre incorrecto', async () => {
            try {
                const plagasEnfermedades = {
                    nombre_clon: "Nombre que no existe",
                    asociaciones_plagas_enfermedades: [ {
                        nombre_plaga: "Plaga 1",
                        enfermedad_asociada: "Enfermedad 1",
                    },
                    {
                        nombre_plaga: "Plaga 2",
                        enfermedad_asociada: "Enfermedad 2",
                    }
                    ]
                };

                const res = await request(app)
                    .post('/api/plagas-enfermedades')
                    .set('x-api-key', apiKey!)
                    .send(plagasEnfermedades);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/plagas-enfermedades: ${error}`);
            }
        });

        // crear plagas enfermedades 

        it('Deberia crear plagas y enfermedades', async () => {
            try {
                const plagasEnfermedades = {
                    nombre_clon: nombre,
                    asociaciones_plagas_enfermedades: [ {
                        nombre_plaga: "Plaga 1",
                        enfermedad_asociada: "Enfermedad 1",
                    },
                    {
                        nombre_plaga: "Plaga 2",
                        enfermedad_asociada: "Enfermedad 2",
                    }
                    ]
                };

                const res = await request(app)
                    .post('/api/plagas-enfermedades')
                    .set('x-api-key', apiKey!)
                    .send(plagasEnfermedades);

                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('asociaciones_plagas_enfermedades').to.be.an('array');

                plagasEnfermedadesBase = res.body;
            } catch (error) {
                throw new Error(`Error en petición POST a /api/plagas-enfermedades: ${error}`);
            }
        });

        // Actualizar nombre de clon en plagas y enfermedades por uno que no existe

        it('Deberia retornar un error al actualizar plagas y enfermedades con un nombre que no existe', async () => {
            try {
                const plagasEnfermedades = {
                    nombre_clon: "Nombre que no existe"
                };

                const res = await request(app)
                    .patch(`/api/plagas-enfermedades/${plagasEnfermedadesBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(plagasEnfermedades);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/plagas-enfermedades: ${error}`);
            }
        });

        // Actualizar plagas y enfermedades

        it('Deberia actualizar plagas y enfermedades', async () => {
            try {
                const plagasEnfermedades = {
                    asociaciones_plagas_enfermedades: [ {
                        nombre_plaga: "Plaga 1",
                        enfermedad_asociada: "Enfermedad 1",
                    },
                    {
                        nombre_plaga: "Plaga 2",
                        enfermedad_asociada: "Enfermedad 2",
                    }
                    ]
                };

                const res = await request(app)
                    .patch(`/api/plagas-enfermedades/${plagasEnfermedadesBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(plagasEnfermedades);

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('asociaciones_plagas_enfermedades').to.be.an('array');

                plagasEnfermedadesBase = res.body;
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/plagas-enfermedades: ${error}`);
            }
        });

        // actualizar plagas enfermedades con un array vacio

        it('Deberia retornar un error al actualizar plagas y enfermedades con un array vacio', async () => {
            try {
                const plagasEnfermedades = {
                    asociaciones_plagas_enfermedades: []
                };

                const res = await request(app)
                    .patch(`/api/plagas-enfermedades/${plagasEnfermedadesBase.id}`)
                    .set('x-api-key', apiKey!)
                    .send(plagasEnfermedades);

                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/plagas-enfermedades: ${error}`);
            }
        });


    });
}