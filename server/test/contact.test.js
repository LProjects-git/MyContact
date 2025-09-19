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

afterEach(async () => {
  await Contact.deleteMany({});
});

  test('POST /contacts → crée un contact', async () => {
    const res = await request(app)
      .post('/contact')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Lina',
        lastName: 'Dddddddd',
        phone: '+33 6 52 43 69 35'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.contact.firstName).toBe('Lina');
  });

  test('GET /contacts → récupère les contacts', async () => {
    const res = await request(app)
      .get('/contact')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.contacts)).toBe(true);
  });
});