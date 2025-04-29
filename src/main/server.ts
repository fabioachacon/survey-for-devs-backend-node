import { MongoUtils } from '../infra/db/mongodb/helpers/mongo-utils';

import env from './config/env';

MongoUtils.connect(env.mongUrl)
    .then(async () => {
        const app = (await import('./config/app')).default;
        app.listen(env.port, () =>
            console.log(`Server running at http://localhost:${env.port}`),
        );
    })
    .catch(console.error);
