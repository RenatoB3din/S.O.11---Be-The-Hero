const request = require('supertest');
const app = require ('../../src/app');
const connection = require('../../src/database/connection');

describe('ON', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();  // Para não acumular o banco de testes. 
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', '12345678')  // Testes que precisem do Authorization
            .send({
                name: "APAD2",
                email: "apad@apad.com",
                whatsapp: "4700000000",
                city: "Floripa",
                uf: "SC"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})