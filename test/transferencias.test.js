const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config();
const { getToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json');

describe('Transferencias', () =>{
    describe('POST /transferencias', () => {
        let token;
        beforeEach(async () => {
            token = await getToken('julio.lima', '123456');
        })

        it('Must return 201 success if transfer is equal or greater than 10', async () => {
            const bodyTransferencias = {...postTransferencias};
            
            const response = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias)
            
            expect(response.status).to.equal(201);
            console.log(response.body);
        });

        it('Must return 422 fail if transfer is less than 10', async () => {
            const bodyTransferencias = {...postTransferencias};
            bodyTransferencias.valor = 7;

            const response = await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias)
            
            expect(response.status).to.equal(422);
            console.log(response.body);
        });
    })
})