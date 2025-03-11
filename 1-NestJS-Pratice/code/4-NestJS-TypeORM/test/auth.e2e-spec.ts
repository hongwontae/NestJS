import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'asdlkjq1234@akl.com';
    // 항상 http 서버에 요청을 수행하도록 합니다.
    return (
      request(app.getHttpServer())
        // 메서드 호출
        .post('/auth/signup')
        .send({ email, password: '@lskdfjl' })
        // 반환되는 응답을 예상합니다.
        // 200 성공 코드 + return 값
        .expect(201)
        .then((res) => {
          const { id, email } = res.body;
          expect(id).toBeDefined();
          expect(email).toEqual(email);
        })
    );
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'dnjsxoghd@naver.com';

    const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email, password : 'q2tlxm@123'})
    .expect(201)

    const cookie = res.get('Set-Cookie');

    const {body} = await request(app.getHttpServer())
    .get('/auth/whoami')
    .set('Cookie', cookie as string[])
    .expect(200)

    expect(body.email).toEqual(email);
    

  });
});
