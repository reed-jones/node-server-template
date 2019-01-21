//routes.test.js
const request = require('supertest')
const server = require('../server.ts')
beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest Routes starting!')
})
// close the server after each test
afterAll(() => {
  server.close()
  console.log('server closed!')
})
describe('basic route tests', () => {
  test('get home route GET /', async () => {
    const response = await request(server).get('/api/hello')
    expect(response.status).toEqual(200)
    expect(response.text).toContain('Hello')
  })
})
