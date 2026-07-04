const request = require('supertest');

const getToken = async (user, password) => {
    //Capture Auth token
    const responseLogin = await request(process.env.BASE_URL)
    .post('/login') //Endpoint method called
    .set('Content-Type','application/json') //Post header
    .send({ //Body of the Post
        username: user,
        senha: password
    })
    return responseLogin.body.token;
}

module.exports = {
    getToken
}