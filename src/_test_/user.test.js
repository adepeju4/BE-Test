import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import app from '../server.js'

const request = supertest(app)


describe('POST /api/register', () => {
    it('responds with json', async () => {
        const response = await request.post('/api/register')
        .send({email: 'testdev@dev.com', password: '1234567'})
        .set('Accept', 'application/json')
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('All fields must be provided')
    })
})



