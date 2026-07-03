const request = require('supertest');
const { expect } = require('chai');

describe('Login', () => {
    describe('POST', () => {
        it('Must return 200 with a string token with valid credentials', async () =>{
            const response = await request('http://localhost:3000')
                .post('/login') //Endpoint method called
                .set('Content-Type','application/json') //Post header
                .send({ //Body of the Post
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            //console.log(response.status); <- Debbuging 
            //console.log(response.body); <- Debbuging

            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');
        });
    });
});