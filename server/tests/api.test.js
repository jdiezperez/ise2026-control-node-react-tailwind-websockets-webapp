const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  it('should return 200 and a status message from /api/status', async () => {
    const res = await request(app).get('/api/status');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should return 400 when missing address from /api/osc', async () => {
    const res = await request(app)
      .post('/api/osc')
      .send({ args: [1, 2, 3] });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Address is required');
  });
});
