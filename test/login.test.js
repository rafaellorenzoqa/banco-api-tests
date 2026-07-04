const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

describe('Login', () => {
    describe('POST /login', () => {
        it('Must return 200 with a string token with valid credentials', async () =>{
            const bodyLogin = {...postLogin};
            const response = await request(process.env.BASE_URL)
                .post('/login') //Endpoint method called
                .set('Content-Type','application/json') //Post header
                .send(bodyLogin)
            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');
        });
    });
});