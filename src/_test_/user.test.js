import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import app from '../server.js'

const request = supertest(app)


describe('POST /user', () => {
    it('responds with')
})

test('post route', async () => {
    const response = await request.post('/api/register')
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('All fields must be provided')
})



describe('user test', async () => {
    let mongo
    beforeAll(async () => {
        process.env.JWT = 'SOME SECRET'
        mongo = new MongoMemoryServer()
        const mongoURI = await mongo.getUri()

        await mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true})
    })

    afterAll(async () => {
        await mongo.stop()
        await mongoose.connection.close()
    })




})

