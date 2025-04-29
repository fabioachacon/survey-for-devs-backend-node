import { Router } from 'express';
import { controllerAdapter } from '../adapers/express/express-route-adapter';
import { SurveyControllerFactory } from '../factory/survey/survey-controller-factory';

export default (router: Router) => {
    router.post(
        '/surveys',
        controllerAdapter(SurveyControllerFactory.create()),
    );
};
