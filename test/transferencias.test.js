const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config();

describe('Transferencias', () =>{
    describe('POST /transferencias', () => {
        it('Must return 201 success if transfer is equal or greater than 10', async () => {
            //Capture Auth token
            const responseLogin = await request(process.env.BASE_URL)
            .post('/login') //Endpoint method called
            .set('Content-Type','application/json') //Post header
            .send({ //Body of the Post
                'username': 'julio.lima',
                'senha': '123456'
            })
            
            const token = responseLogin.body.token;

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
             //Capture Auth token
            const responseLogin = await request(process.env.BASE_URL)
            .post('/login') //Endpoint method called
            .set('Content-Type','application/json') //Post header
            .send({ //Body of the Post
                'username': 'julio.lima',
                'senha': '123456'
            })
            
            const token = responseLogin.body.token;

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