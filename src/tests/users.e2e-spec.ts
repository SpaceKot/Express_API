//В отличие от юнит-тестов, end-to-end тестирование требует полностью развернутого приложения, включая окружение и базу данных.
//Структура end-to-end тестов похожа на юнит-тесты. Необходимо получить экземпляр приложения, используя SuperTest для выполнения HTTP-запросов.
import { App } from "../app";
import { boot } from "../main";
import request from 'supertest';


import { it, afterAll, expect, beforeAll, describe } from '@jest/globals'


let application: App;

beforeAll(async () => {
    const { app } = await boot;
    application = app;
});


describe('Users 2e2', () => {
    it('Register - error', async () => {
        const res = await request(application.app)
            .post('/users/register')
            .send({ email: 'tea2@smple.com', password: '1' });
        expect(res.statusCode).toBe(422);
    });

    it('Login - success', async () => {
        const res = await request(application.app)
            .post('/users/login')
            .send({ email: 'tea2@smple.com', password: 'asdasdasd' });
        expect(res.body.jwt).not.toBeUndefined();
    });

    it('Login - error', async () => {
        const res = await request(application.app)
            .post('/users/login')
            .send({ email: 'tea2@smple.com', password: '1' });
        expect(res.statusCode).toBe(401);
    });

    it('Info - success', async () => {
        const login = await request(application.app)
            .post('/users/login')
            .send({ email: 'tea2@smple.com', password: 'asdasdasd' });

        const res = await request(application.app).
            get('/users/info').
            set('Authorization', `Bearer ${login.body.jwt}`);
        expect(res.body.email).toBe('tea2@smple.com');
    });

    it('Info - error', async () => {
        const res = await request(application.app)
            .get('/users/info')
            .set('Authorization', 'Bearer 1');
        expect(res.statusCode).toBe(401);
    });
});


afterAll(() => {
    application.close();
})