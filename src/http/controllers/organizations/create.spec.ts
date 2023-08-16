import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'

describe('Create Organization Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new organization', async () => {
    await request(app.server)
      .post('/organizations')
      .send({
        email: 'org@example.com',
        password: '123456',
        name: 'Main organization',
        owner_name: 'John Doe',
        zip_code: '71938360',
        address: 'Street 1',
        whatsapp: '61982835430',
        phone: '61982835430',
        city: 'Brasília'
      })
      .expect(201)
  })
})
