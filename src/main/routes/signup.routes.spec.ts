import request from 'supertest';
import app from '../config/app';

describe('POST /signup', () => {
    it('should return an account on status 200', async () => {
        app.post('/signup', (req, res) => {
            res.send('');
        });

        await request(app)
            .post('/signup')
            .send({
                name: 'Jon',
                email: 'hello@email.com',
                password: 'any',
                passwordConfirmation: 'any',
            })
            .expect(200);
    });
});
