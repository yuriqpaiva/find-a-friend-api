import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'

describe('Search Pets Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    await request(app.server).post('/organizations').send({
      email: 'org@example.com',
      password: '123456',
      name: 'Main organization',
      owner_name: 'John Doe',
      zip_code: '71938360',
      address: 'Street 1',
      whatsapp: '61982835430',
      phone: '61982835430',
      city: 'Acre'
    })

    await request(app.server).post('/pets').send({
      name: 'Pet 1',
      description: 'Pet 1 description',
      age: 1,
      size: 1,
      energy_level: 1,
      dependency_level: 1,
      environment: 'Pet 1 environment',
      organization_id: 1
    })

    const response = await request(app.server)
      .get(`/pets/city/${1}`)
      .query({
        age: 1,
        size: 1,
        energy_level: 1,
        dependency_level: 1
      })
      .send()

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
