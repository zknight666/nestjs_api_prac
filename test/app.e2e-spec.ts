import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스트를 위한 어플리케이션을 생성. main.ts에 설정한 app.useGlobalPipes 환경을 똑같이 해주어야 함.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('Post 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('Post 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          hacking: 'by me',
        })
        .expect(400);
    });
    it('Delete', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });

    describe('movies/:id', () => {
      it('GET 200', () => {
        return request(app.getHttpServer()).get('/movies/1').expect(200);
      });
      it('GET 404', () => {
        return request(app.getHttpServer()).get('/movies/999').expect(404);
      });
      it('PATCH 200', () => {
        return request(app.getHttpServer())
          .patch('/movies/1')
          .send({
            title: 'Updated Test',
            year: 200009,
            genres: ['Updated test'],
          })
          .expect(200);
      });
      it('DELETE 200', () => {
        return request(app.getHttpServer()).delete('/movies/1').expect(200);
      });
    });
  });
});
