const app = require("../src/app")
const request = require('supertest')(app)
const { faker } = require('@faker-js/faker')

let user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

describe.each([
    [{
        name: user.name,
        email: user.email,
        password: user.password
    },{
        name: user.name,
        email: user.email,
        password: user.password
    }]
])('Cadastro de Usuario', (user, notUser) => {
    test("Deve cadastrar um usuario com sucesso", () => {

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(user.email)
            })
    })

    test("Nao deve cadastrar um usuario com campos vazios", () => {

        return request.post('/user')
            .send(notUser)
            .then(res => {
                expect(res.statusCode).toEqual(401)
                expect(res.body).toMatchObject({error: {}})
            })
    })

    test("Nao deve cadastrar um usuario com mesmo email", async () => {

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(401)
                expect(res.body).toMatchObject({error: { email: {message: "The specified email address is already in use."}}})
            })
    })
})