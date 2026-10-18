import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import type { Application } from 'express';
import { createApp } from '../src/app';
import { BastionModel } from '../src/models/bastion.model';
import { FacilityModel } from '../src/models/facility.model';
import { DefenderModel } from '../src/models/defender.model';
import { HirelingModel } from '../src/models/hireling.model';

const SECRET = 'test-secret';

const token = (userId: string, roles: string[] = ['user']) =>
  jwt.sign({ sub: userId, roles }, SECRET, { expiresIn: '1h' });

describe('bastions authorization', () => {
  let mongod: MongoMemoryServer;
  let app: Application;
  let ownerToken: string;
  let otherToken: string;
  let bastionId: string;
  let otherBastionId: string;
  let otherFacilityId: string;
  let facilityId: string;
  let massFacilityId: string;
  let defenderId: string;
  let massDefenderId: string;
  let hirelingId: string;
  let massHirelingId: string;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongod.getUri();
    process.env.JWT_SECRET = SECRET;
    app = await createApp();

    const bastion = await BastionModel.create({
      userId: 'owner-1',
      name: 'My Bastion',
      description: 'desc',
    });
    bastionId = bastion._id.toString();
    ownerToken = token('owner-1');
    otherToken = token('other-2');

    const otherBastion = await BastionModel.create({
      userId: 'other-2',
      name: 'Other Bastion',
      description: 'desc',
    });
    otherBastionId = otherBastion._id.toString();
    const otherFacility = await FacilityModel.create({
      name: 'Other Facility',
      rank: 'a',
      description: 'd',
      bastionId: otherBastionId,
    });
    otherFacilityId = otherFacility._id.toString();

    const facility = await FacilityModel.create({
      name: 'Owner Facility',
      rank: 'a',
      description: 'd',
      bastionId,
    });
    facilityId = facility._id.toString();

    const massFacility = await FacilityModel.create({
      name: 'Mass Facility',
      rank: 'a',
      description: 'd',
      bastionId,
    });
    massFacilityId = massFacility._id.toString();

    const defender = await DefenderModel.create({ name: 'Guard', type: 'melee', bastionId });
    defenderId = defender._id.toString();

    const massDefender = await DefenderModel.create({ name: 'Mass Guard', type: 'melee', bastionId });
    massDefenderId = massDefender._id.toString();

    const hireling = await HirelingModel.create({ name: 'Scout', bastionId });
    hirelingId = hireling._id.toString();

    const massHireling = await HirelingModel.create({ name: 'Mass Scout', bastionId });
    massHirelingId = massHireling._id.toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('rejects an unauthenticated facility write', async () => {
    await request(app)
      .post('/facilities')
      .send({ name: 'Barracks', rank: 'a', description: 'd', bastionId })
      .expect(401);
  });

  it('rejects a non-owner facility write', async () => {
    await request(app)
      .post('/facilities')
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ name: 'Barracks', rank: 'a', description: 'd', bastionId })
      .expect(404);
  });

  it('allows the owner to create a facility', async () => {
    await request(app)
      .post('/facilities')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Barracks', rank: 'a', description: 'd', bastionId })
      .expect(201);
  });

  it('returns only the caller\'s own bastions by default', async () => {
    const res = await request(app)
      .get('/bastions')
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].userId).toBe('other-2');
  });

  it('returns all bastions when all=true', async () => {
    const res = await request(app)
      .get('/bastions?all=true')
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(200);
    expect(res.body.data).toHaveLength(2);
  });

  it('rejects a non-admin newspaper write', async () => {
    await request(app)
      .post('/newspapers')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ title: 't', content: 'c', bastionId })
      .expect(403);
  });

  it('allows an admin newspaper write', async () => {
    await request(app)
      .post('/newspapers')
      .set('Authorization', `Bearer ${token('admin-3', ['user', 'admin'])}`)
      .send({ title: 't', content: 'c', bastionId })
      .expect(201);
  });

  it('rejects a non-owner defender create', async () => {
    await request(app)
      .post('/defenders')
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ name: 'Rogue', type: 'melee', bastionId })
      .expect(404);
  });

  it('allows the owner to create a defender', async () => {
    await request(app)
      .post('/defenders')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Rogue', type: 'melee', bastionId })
      .expect(201);
  });

  it('rejects a non-owner defender update', async () => {
    await request(app)
      .patch(`/defenders/${defenderId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ name: 'Hijacked' })
      .expect(404);
  });

  it('allows the owner to update a defender', async () => {
    await request(app)
      .patch(`/defenders/${defenderId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Guard II' })
      .expect(200);
  });

  it('ignores bastionId on a defender update (no mass assignment)', async () => {
    await request(app)
      .patch(`/defenders/${massDefenderId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Guard III', bastionId: otherBastionId })
      .expect(200);
    const doc = await DefenderModel.findById(massDefenderId).lean().exec();
    expect(doc!.bastionId).toBe(bastionId);
    expect(doc!.name).toBe('Guard III');
  });

  it('rejects a non-owner defender delete', async () => {
    await request(app)
      .delete(`/defenders/${defenderId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(404);
  });

  it('allows the owner to delete a defender', async () => {
    await request(app)
      .delete(`/defenders/${defenderId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
  });

  it('rejects a non-owner hireling create', async () => {
    await request(app)
      .post('/hirelings')
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ name: 'Spy', bastionId })
      .expect(404);
  });

  it('allows the owner to create a hireling', async () => {
    await request(app)
      .post('/hirelings')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Spy', bastionId })
      .expect(201);
  });

  it('rejects a non-owner hireling update', async () => {
    await request(app)
      .patch(`/hirelings/${hirelingId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ name: 'Hijacked' })
      .expect(404);
  });

  it('allows the owner to update a hireling', async () => {
    await request(app)
      .patch(`/hirelings/${hirelingId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Scout II' })
      .expect(200);
  });

  it('ignores bastionId on a hireling update (no mass assignment)', async () => {
    await request(app)
      .patch(`/hirelings/${massHirelingId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Scout III', bastionId: otherBastionId })
      .expect(200);
    const doc = await HirelingModel.findById(massHirelingId).lean().exec();
    expect(doc!.bastionId).toBe(bastionId);
    expect(doc!.name).toBe('Scout III');
  });

  it('rejects a non-owner hireling delete', async () => {
    await request(app)
      .delete(`/hirelings/${hirelingId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(404);
  });

  it('allows the owner to delete a hireling', async () => {
    await request(app)
      .delete(`/hirelings/${hirelingId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .expect(200);
  });

  it('ignores bastionId on a facility update (no mass assignment)', async () => {
    await request(app)
      .patch(`/facilities/${massFacilityId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Renamed Facility', bastionId: otherBastionId })
      .expect(200);
    const doc = await FacilityModel.findById(massFacilityId).lean().exec();
    expect(doc!.bastionId).toBe(bastionId);
    expect(doc!.name).toBe('Renamed Facility');
  });

  it('rejects a nested facility hijack of another owner facility', async () => {
    await request(app)
      .put(`/bastions/${bastionId}`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ facilities: [{ id: otherFacilityId, name: 'Hijacked', rank: 'a', description: 'd' }] })
      .expect(404);
    const doc = await FacilityModel.findById(otherFacilityId).lean().exec();
    expect(doc!.name).toBe('Other Facility');
    expect(doc!.bastionId).toBe(otherBastionId);
  });
});
