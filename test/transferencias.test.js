const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config();
const { getToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json');

describe('Transferencias', () =>{
    let token;
    beforeEach(async () => {
        token = await getToken('julio.lima', '123456');
    })

    describe('POST /transferencias', () => {
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

    describe ('GET /transferencia/{id}', () => {
        it('Must return success 200 and data must match the databank data with valid {id}', async () => {
            const response = await request(process.env.BASE_URL)
            .get('/transferencias/9')
            .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(9);
            expect(response.body.id).to.be.a('number');
            expect(response.body.conta_origem_id).to.equal(1);
            expect(response.body.conta_destino_id).to.equal(2);
            expect(response.body.valor).to.equal(11.00);
        })
    })
    
    describe('GET /transferencias', () =>{
        it('Number of objects per page must be equal to 10', async () => {
            const response = await request (process.env.BASE_URL)
            .get('/transferencias?page=1&limit=10')
            .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200);
            expect(response.body.limit).to.equal(10);
            expect(response.body.transferencias).to.have.lengthOf(10);
        })
    })
})