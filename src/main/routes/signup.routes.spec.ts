import request from 'supertest';
import app from '../config/app';

describe('Signup Routes', () => {
    it('should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Fábio',
                email: 'fabio.costa@consistem.com.br',
                password: 'any',
                passwordConfirmation: 'any',
            })
            .expect(200);
    });
});
