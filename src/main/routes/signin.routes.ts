import { Router } from 'express';
import { controllerAdapter } from '../adapers/express/express-route-adapter';
import { SignInControllerFactory } from '../factory/signin/signin-controller-factory';

export default (router: Router) => {
    router.post('/signin', controllerAdapter(SignInControllerFactory.create()));
};
