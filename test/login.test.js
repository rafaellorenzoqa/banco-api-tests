const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

/*
it — wrong username → 401
it — wrong password → 401
it — missing username → 400 DONE
it — missing password → 400 DONE
it — missing both → 400 DONE
*/

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

        it('Must return 400 when username is missing', async () =>{
            const bodyLogin = {...postLogin};
            delete bodyLogin.username;

            const response = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin);

            expect(response.status).to.equal(400);

        })

        it('Must return 400 when password is missing', async () => {
            const bodyLogin = {...postLogin};
            delete bodyLogin.senha;

            const response = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin);

            expect(response.status).to.equal(400);
        })
    
        it('Must return 400 when both login and password are missing', async () =>{
            const bodyLogin = {...postLogin}
            delete bodyLogin.senha;
            delete bodyLogin.username;
        
            const response = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin);

            expect(response.status).to.equal(400);
        })

        it('Must return 401 when username is incorrect', async () =>{
            const bodyLogin = {...postLogin};
            bodyLogin.username = "rafael.lorenzo";

            const response = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin);

            expect(response.status).to.equal(401);
        })

        it('Must return 401 when password is incorrect', async () => {
            const bodyLogin = {...postLogin};
            bodyLogin.senha = 'qwerty';

            const response = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin);

            expect(response.status).to.equal(401);
        })
    });
});