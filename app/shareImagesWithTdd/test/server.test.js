const app = require("../src/app")
const request = require('supertest')(app)

test("A aplicação deve responder na porta 3000", () => {
    return request.get('/').then(res => {
        expect(res.statusCode).toEqual(200)
    })
})