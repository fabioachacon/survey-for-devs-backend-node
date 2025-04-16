import { Router } from 'express';
import { controllerAdapter } from '../adapers/express-route-adapter';
import { SignUpControllerFactory } from '../factory/signup/signup';

export default (router: Router) => {
    router.post('/signup', controllerAdapter(SignUpControllerFactory.create()));
};
