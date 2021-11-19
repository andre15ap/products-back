import supertest from 'supertest';

import { AppServer } from '../../../../server';

describe('Create AppHit Controller', () => {
  let appServer: AppServer;

  beforeAll(async () => {
    appServer = new AppServer();
    await appServer.start();
  });

  afterAll(async () => {
    await appServer.stop();
  });

  it('should be able to create a AppHit', async () => {
    const server = appServer.getInstance();

    const response = await supertest(server).post('/app-hits')
      .send({
        namespace: 'test',
        key: 'key_test',
        value: 10,
      });

    expect(response.statusCode).toBe(201);
  });
});
