const app = require("../src/app")
const request = require('supertest')(app)
const { faker } = require('@faker-js/faker')

describe('Cadastro de Usuario', () => {
    test("Deve cadastrar um usuario com sucesso", () => {

        let user = {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(user.email)
            }).catch(err => {
                console.log(err)
            })
    })
})