const app = require("../src/app")
const request = require('supertest')(app)
const { faker } = require('@faker-js/faker')

let user = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

let notUser = {
    name: "",
    email: "",
    password: ""
}

let fakeUser = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

let expected = {
    statusOk: 200,
    statusError: 401,
    jsonErrorEmail: { email: {message: "The specified email address is already in use."}}
}

afterAll(() => {
    return request.delete(`/user/${user.email}`)
        .then(res => {})
        .catch(err => {console.log(err)})
})

describe.each([
    [user, fakeUser, notUser, expected]
])('Cadastro de Usuario', (user, fakeUser, notUser, expected) => {

    test("Deve cadastrar um usuario com sucesso", () => {

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(expected.statusOk)
                expect(res.body.email).toEqual(user.email)
            })
    })

    test("Nao deve cadastrar um usuario com campos vazios", () => {

        return request.post('/user')
            .send(notUser)
            .then(res => {
                expect(res.statusCode).toEqual(expected.statusError)
                expect(res.body.error).toBeDefined()
            })
    })

    test("Nao deve cadastrar um usuario com mesmo email", async () => {

        return request.post('/user')
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(expected.statusError)
                expect(res.body.error).toMatchObject(expected.jsonErrorEmail)
            })
    })
})

describe.each([
    [user, notUser, expected]
])('Autenticação', (user, notUser, expected) => {
    test('Deve me retornar um token quando logar',() => {
        return request.post('/login')
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(expected.statusOk)
            expect(res.body.token).toBeDefined();
        })
    })

    test('Deve impedir que um usuario nao cadastrado se logue',() => {
        return request.post('/login')
        .send(fakeUser)
        .then(res => {
            expect(res.statusCode).toEqual(expected.statusError)
            expect(res.body.message).toBeDefined();
        })
    })

    test('Deve impedir que um usuario se logue com a senha errada',() => {
        return request.post('/login')
        .send({
            email: user.email,
            password: 123456
        })
        .then(res => {
            expect(res.statusCode).toEqual(expected.statusError)
            expect(res.body.message).toBeDefined();
        })
    })
})