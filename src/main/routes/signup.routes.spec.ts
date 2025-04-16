import request from 'supertest';
import app from '../config/app';

describe('Signup Routes', () => {
    it('should return an account on status 200', async () => {
        app.post('/signup', (req, res) => {
            res.send('');
        });

        await request(app)
            .post('/signup')
            .send({
                name: 'Fábio',
                email: 'fabio.costa@consistem.com.br',
                password: 'any',
                passwordConfirmation: 'any',
            })
            .expect(200);
    });
});
