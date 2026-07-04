const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json');

const getToken = async (user, password) => {
    const bodyLogin = {... postLogin};
    //Capture Auth token
    const responseLogin = await request(process.env.BASE_URL)
    .post('/login') //Endpoint method called
    .set('Content-Type','application/json') //Post header
    .send(bodyLogin)
    return responseLogin.body.token;
}

module.exports = {
    getToken
}