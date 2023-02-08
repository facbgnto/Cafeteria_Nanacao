const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo  status  200  y un arreglo ", async () => {
        const response = await request(server).get("/cafes").send()
        const { body } = await request(server).get("/cafes").send()
        const coffees = body
        const coffee = {"id": 1, "nombre": "Cortado"}     
        const status = response.statusCode
        expect(status).toBe(200)
        expect(coffees).toBeInstanceOf(Array)
        expect(coffees).toContainEqual(coffee)
    })
    it("Obteniendo error 404  al eliminar un cafe que no existe", async () => {

        const jwt = "token"
        const id = new Date()
        const response = await request(server)
            .delete(`/cafes/${id}`)
            .set("Authorization", jwt)
            .send()
        const status = response.statusCode
        expect(status).toBe(404)
    })
    it("obteniendo error 201 al enviar un nuevo cafe", async () => {
        const id = Math.floor(Math.random() * 999)
        const coffee = { id, nombre: "New Coffeee =)!!" }
        const response = await request(server).post("/cafes")
            .send(coffee)
        const status = response.statusCode
        expect(status).toBe(201)
    })
    it("obteniendo Error 400  al enviar un cafe enviando un ID diferente al ID dentro del Payload", async (id = 3) => {
        const coffee = {id: 7, nombre : "Cafe modificado"}
        const res = await request(server).put(`/cafes/${id}`).send(coffee)
        const status = res.statusCode
        expect(status).toBe(400)
    })
});
