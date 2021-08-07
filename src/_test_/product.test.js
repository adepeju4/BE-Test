import supertest from "supertest"
// import { MongoMemoryServer } from 'mongodb-memory-server-core';
import mongoose from 'mongoose';
import app from '../server';
const request = supertest(app)

describe('PRODUCTS test', () => {
    let mongo
    beforeAll(async () => {
       
        const mongoURI = process.env.db;
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
        const response = await request.post('/user/login').send({ email: '123', password: '123' })
        
    })

    it('should get the list of products', async () => {
        const response = await request.get('/dishes/list');
        expect(response.body.status).toBe("success");
    })

    it('should create a new dish', async () => {
    const dish = {
        name: 'newDish2',
        image: 'imageeeeeeeee',
        category: 'best dishes',
        price: 500,
        countInStock: 500,
        description: 'testing...testing...testing...'
    }
        const result = await request.post('/dishes/create').send(dish);
        expect(result.body.status).toBe("success");
    });

    afterAll(async () => {
       
        await mongoose.connection.close()
    })

})