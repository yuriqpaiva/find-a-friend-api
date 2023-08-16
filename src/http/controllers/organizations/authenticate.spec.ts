import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
describe('Authenticate Organization Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a organization', async () => {
    await request(app.server).post('/organizations').send({
      email: 'org@example.com',
      password: '12345678',
      name: 'Main organization',
      owner_name: 'John Doe',
      zip_code: '71938360',
      address: 'Street 1',
      whatsapp: '61982835430',
      phone: '61982835430',
      city: 'Brasília'
    })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'org@example.com',
        password: '12345678'
      })
      .expect(200)

    expect(response.body).toMatchObject({
      token: expect.any(String)
    })
  })
})
