const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Contact = require('../models/contact');

beforeAll(async () => {
  await mongoose.connect(process.env.DBMONGO)
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Contact routes', () => {
let token;

beforeEach(async () => {
  await request(app)
    .post('/auth/register')
    .send({ email: 'test@example.com', password: '123456' });

  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'test@example.com', password: '123456' });

  token = res.body.token;
});

beforeEach(async () => {
  await Contact.deleteOne({
        firstName: 'Test',
        lastName: 'Test',
        phone: '01 02 03 04 05'
      });
});

  test('POST /contacts → crée un contact', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Test',
        lastName: 'Test',
        phone: '01 02 03 04 05'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.contact.firstName).toBe('Test');
  });

  test('GET /contacts → récupère les contacts', async () => {
    const res = await request(app)
      .get('/contact')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.contacts)).toBe(true);
  });
});