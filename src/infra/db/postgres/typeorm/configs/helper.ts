import { EntityTarget, ObjectLiteral } from 'typeorm';
import { dataSourceConfig } from './orm_postgres.config';

export class TypeORMHelper {
    static async connect() {
        dataSourceConfig.initialize();
    }
    static async disconnect() {
        dataSourceConfig.destroy();
    }
    static async getRepository(target: EntityTarget<ObjectLiteral>) {
        return dataSourceConfig.getRepository(target);
    }
}
