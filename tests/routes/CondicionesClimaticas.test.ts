import { expect } from 'chai';
import request from 'supertest';
import app from "../../src";
import { CondicionesClimaticasDTO } from "../../src/application/dtos/condicionesClimaticas_dto";
import { config } from 'dotenv';

config();

export const condicionesClimaticasTest = ({ nombre }) => {
    const apiKey = process.env.API_KEY;
    let condicionesClimaticas: CondicionesClimaticasDTO & { id: number };

    describe('Operaciones sobre condiciones climáticas', () => {

        // crear condiciones climáticas sin nombre

        it('Deberia retornar un error al crear condiciones climáticas sin nombre', async () => {
            try {
                const condiciones = {
                    rango_altitudinal: "2000 - 200msnm",
                    rango_luminosidad: "media",
                    temperatura: "20 - 25 grados",
                    precipitacion: "1000 - 2000 mm",
                    humedad_relativa: "60 - 80 %",
                };

                const res = await request(app)
                    .post('/api/condiciones-climaticas')
                    .set('x-api-key', apiKey!)
                    .send(condiciones);

                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/condiciones-climaticas: ${error}`);
            }
        });

        // crear condiciones climáticas con un nombre que no existe

        it('Deberia retornar un error al crear condiciones climáticas con un nombre que no existe', async () => {
            try {
                const condiciones = {
                    nombre_clon: "Nombre que no existe",
                    rango_altitudinal: "2000 - 200msnm",
                    rango_luminosidad: "media",
                    temperatura: "20 - 25 grados",
                    precipitacion: "1000 - 2000 mm",
                    humedad_relativa: "60 - 80 %",
                };

                const res = await request(app)
                    .post('/api/condiciones-climaticas')
                    .set('x-api-key', apiKey!)
                    .send(condiciones);

                expect(res.status).to.equal(503);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/condiciones-climaticas: ${error}`);
            }
        });

        // crear condiciones climáticas

        it('Deberia crear condiciones climáticas', async () => {
            try {

                const condiciones = {
                    nombre_clon: nombre,
                    rango_altitudinal: "2000 - 200msnm",
                    rango_luminosidad: "media",
                    temperatura: "20 - 25 grados",
                    precipitacion: "1000 - 2000 mm",
                    humedad_relativa: "60 - 80 %",
                };

                const res = await request(app)
                    .post('/api/condiciones-climaticas')
                    .set('x-api-key', apiKey!)
                    .send(condiciones);

                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('rango_altitudinal');
                expect(res.body).to.have.property('rango_luminosidad');
                expect(res.body).to.have.property('temperatura');
                expect(res.body).to.have.property('precipitacion');
                expect(res.body).to.have.property('humedad_relativa');
                expect(res.body).to.have.property('id')
                expect(res.body).to.be.an('object');

                condicionesClimaticas = res.body;
            } catch (error) {
                throw new Error(`Error en petición POST a /api/condiciones-climaticas: ${error}`);
            }
        });      

        // crear condiciones climáticas que ya existen

        it('Deberia retornar un error al crear condiciones climáticas que ya existen', async () => {
            try {
                const condiciones = {
                    nombre_clon: nombre,
                    rango_altitudinal: "2000 - 200msnm",
                    rango_luminosidad: "media",
                    temperatura: "20 - 25 grados",
                    precipitacion: "1000 - 2000 mm",
                    humedad_relativa: "60 - 80 %",
                };

                const res = await request(app)
                    .post('/api/condiciones-climaticas')
                    .set('x-api-key', apiKey!)
                    .send(condiciones);

                expect(res.status).to.equal(409);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición POST a /api/condiciones-climaticas: ${error}`);
            }
        });

        // actualizar condiciones climáticas por algun valor

        it('Deberia actualizar condiciones climáticas', async () => {
            try {

                const condiciones = {
                    rango_altitudinal: "2000 - 2500msnm",
                    humedad_relativa: "60 - 70 %",
                };

                const res = await request(app)
                    .patch(`/api/condiciones-climaticas/${condicionesClimaticas.id}`)
                    .set('x-api-key', apiKey!)
                    .send(condiciones);

                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('nombre_clon');
                expect(res.body).to.have.property('rango_altitudinal');
                expect(res.body).to.have.property('rango_luminosidad');
                expect(res.body).to.have.property('temperatura');
                expect(res.body).to.have.property('precipitacion');
                expect(res.body).to.have.property('humedad_relativa');
                expect(res.body).to.have.property('id')
                expect(res.body).to.be.an('object');

                condicionesClimaticas = res.body;
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/condiciones-climaticas: ${error}`);
            }
        });
        
        // actualizar condiciones climáticas a un nombre que no existe

        it('Deberia retornar un error al actualizar condiciones climáticas con un nombre que no existe', async () => {
            try {
                const condiciones = {
                    nombre_clon: "Nombre que no existe",
                };

                const res = await request(app)
                    .patch(`/api/condiciones-climaticas/0`)
                    .set('x-api-key', apiKey!)
                    .send(condiciones);

                expect(res.status).to.equal(404)
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('error');
            } catch (error) {
                throw new Error(`Error en petición PATCH a /api/condiciones-climaticas: ${error}`);
            }
        });

    });
}