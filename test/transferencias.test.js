const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config();
const { getToken } = require('../helpers/autenticacao');

describe('Transferencias', () =>{
    describe('POST /transferencias', () => {
        it('Must return 201 success if transfer is equal or greater than 10', async () => {
            const token = await getToken('julio.lima', '123456');

            const response = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                contaOrigem: 1,
                contaDestino: 2,
                valor: 11,
                token: ""
            })
            
            expect(response.status).to.equal(201);
            console.log(response.body);
        });

        it('Must return 422 fail if transfer is smaller than 10', async () => {
            const token = await getToken('julio.lima', '123456');

            const response = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                contaOrigem: 1,
                contaDestino: 2,
                valor: 9,
                token: ""
            })
            
            expect(response.status).to.equal(422);
            console.log(response.body);
        });
    })
})