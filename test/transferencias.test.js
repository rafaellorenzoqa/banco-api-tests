const request = require('supertest'); //expect()
const { expect } = require('chai'); //
require ('dotenv').config(); //global variables
const { getToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias.json'); //imports postTransferencia as fixture

describe('Transferencias', () =>{
    let token; //a variable named token to hold the auth token later on
    beforeEach(async () => { //execute this before each it()
        token = await getToken('julio.lima', '123456'); //getToken returns an authToken, saved in the token variable created before
    })

    describe('POST /transferencias', () => {

        it('Must return 201 success if transfer is equal or greater than 10', async () => {
            const bodyTransferencias = {...postTransferencias}; //bodyTransferencias receives a copy of the postTranferencias JSON object
            
            const response = await request(process.env.BASE_URL) //response receives the request from the global varian BASE_URL
            .post('/transferencias') //the method we are testing: post and the endpoint /transferencias
            .set('Content-Type', 'application/json') //the header of the request
            .set('Authorization', `Bearer ${token}`) //sends the Bearer token as authorization
            .send(bodyTransferencias); //sends the JSON object in the body of the request
            
            expect(response.status).to.equal(201);
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
            
        });
    })

    describe ('GET /transferencia/{id}', () => {
        let transferId;
        let contaOrigemId;
        let contaDestinoId;

        beforeEach(async () => { //create a new transfer only to capture its id.
            const bodyTransferencias = {...postTransferencias};

            await request(process.env.BASE_URL)
            .post('/transferencias')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(bodyTransferencias)

            const getResponse = await request(process.env.BASE_URL)
            .get('/transferencias?page=1&limit=1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            transferId = getResponse.body.transferencias[0].id;
            contaOrigemId = getResponse.body.transferencias[0].conta_origem_id;
            contaDestinoId = getResponse.body.transferencias[0].conta_destino_id;
        })

        afterEach(async () =>{ //delete the newly created id for each test. Helps keep data base clean.
            await request(process.env.BASE_URL)
            .delete(`/transferencias/${transferId}`)
            .set('Authorization', `Bearer ${token}`)
        })

        it('Must return 200 - KNOWN BUG: valor returns string instead of number', async ()=> {
            const response = await request(process.env.BASE_URL)
            .get(`/transferencias/${transferId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(transferId);
            expect(response.body.id).to.be.a('number');
            expect(response.body.conta_origem_id).to.equal(contaOrigemId);
            expect(response.body.conta_destino_id).to.equal(contaDestinoId);
            expect(response.body.valor).to.equal('11.00');
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