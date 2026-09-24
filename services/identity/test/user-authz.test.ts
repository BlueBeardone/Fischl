import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import type { Application } from 'express';
import { createApp } from '../src/app';
import { UserModel } from '../src/models/user.model';

const SECRET = 'test-secret';

const token = (userId: string, roles: string[] = ['user']) =>
  jwt.sign({ sub: userId, roles }, SECRET, { expiresIn: '1h' });

describe('identity user authorization', () => {
  let mongod: MongoMemoryServer;
  let app: Application;
  let selfId: string;
  let otherId: string;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongod.getUri();
    process.env.JWT_SECRET = SECRET;
    app = await createApp();

    const self = await UserModel.create({ email: 'a@x.com', username: 'alice', password: 'h' });
    const other = await UserModel.create({ email: 'b@x.com', username: 'bob', password: 'h' });
    selfId = self._id.toString();
    otherId = other._id.toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('rejects an unauthenticated rename', async () => {
    await request(app).patch(`/identity/users/${selfId}`).send({ displayName: 'x' }).expect(401);
  });

  it('rejects renaming another user', async () => {
    await request(app)
      .patch(`/identity/users/${otherId}`)
      .set('Authorization', `Bearer ${token(selfId)}`)
      .send({ displayName: 'x' })
      .expect(403);
  });

  it('allows a user to rename themselves', async () => {
    await request(app)
      .patch(`/identity/users/${selfId}`)
      .set('Authorization', `Bearer ${token(selfId)}`)
      .send({ displayName: 'alice2' })
      .expect(200);
  });

  it('issues a token containing a roles claim on register', async () => {
    const res = await request(app)
      .post('/identity/auth/register')
      .send({ email: 'roles@x.com', username: 'roleuser', password: 'password123' })
      .expect(201);
    const decoded = jwt.verify(res.body.data.token, SECRET) as jwt.JwtPayload;
    expect(decoded.roles).toEqual(['user']);
  });
});
