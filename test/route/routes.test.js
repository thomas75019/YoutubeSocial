const supertest = require('supertest')
const app = require('express')
const request = supertest(app)

test('the data is peanut butter', async () => {
    const response = await request.post('/api/')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
});

