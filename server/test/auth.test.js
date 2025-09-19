const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect(process.env.DBMONGO);
});

afterEach(async () => {
  await User.deleteOne({ email: 'test@example.com' });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth routes', () => {
  const testUser = {
    email: 'test1@example.com',
    password: '123456'
  };

  test('POST /auth/register → crée un utilisateur', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created');
  });

  test('POST /auth/register → refuse un email déjà utilisé', async () => {
    await request(app).post('/auth/register').send(testUser);

    const res = await request(app).post('/auth/register').send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email already used');
  });

  test('POST /auth/login → retourne un token JWT', async () => {
    await request(app).post('/auth/register').send(testUser);

    const res = await request(app).post('/auth/login').send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('GET /auth/protected → retourne l’utilisateur connecté', async () => {
    await request(app).post('/auth/register').send(testUser);

    const loginRes = await request(app).post('/auth/login').send(testUser);
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/auth/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.user.password).toBeUndefined();
  });

  test('GET /auth/protected → refuse sans token', async () => {
    const res = await request(app).get('/auth/protected');

    expect(res.statusCode).toBe(401);
  });
});