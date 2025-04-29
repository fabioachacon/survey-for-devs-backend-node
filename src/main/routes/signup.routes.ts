import { Router } from 'express';
import { controllerAdapter } from '../adapers/express/express-route-adapter';
import { SignUpControllerFactory } from '../factory/signup/signup-controller-factory';

export default (router: Router) => {
    router.post('/signup', controllerAdapter(SignUpControllerFactory.create()));
};
