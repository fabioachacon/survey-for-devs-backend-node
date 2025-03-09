import { DataSource } from 'typeorm';

export const dataSourceConfig = new DataSource({
    type: 'postgres',
    host: '172.17.0.2',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [],
});
