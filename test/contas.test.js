const request = require('supertest'); //expect()
const { expect } = require('chai'); //
require ('dotenv').config(); //global variables
const { getToken } = require('../helpers/autenticacao');

describe ('Contas', async () => {
    let token;

    beforeEach(async () =>{
        token = await getToken("julio.lima", "123456");
    })
    
    describe ('GET /contas', () =>{
        it('Must return status 200, the limit and length must match the backend', async () =>{
            const response = await request(process.env.BASE_URL)
            .get('/contas')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            
            expect(response.status).to.equal(200);
            expect(response.body.contas.length).to.equal(2);
        })
    })

    describe ('GET /contas/id', () => {
        it('Must return status 200 and the ID must match the account ID', async () =>{
            const accountId = 1;
            const response = await request(process.env.BASE_URL)
            .get(`/contas/${accountId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(accountId);
        })
    })
})