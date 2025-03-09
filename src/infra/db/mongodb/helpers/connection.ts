import { Collection, MongoClient } from 'mongodb';

export class MongoUtils {
    private static client: MongoClient | null = null;

    static async connect(url: string) {
        this.client = await MongoClient.connect(url);
    }

    static async disconnect() {
        await this.client.close();
    }

    static getCollection(name: string): Collection {
        return this.client.db().collection(name);
    }

    static map(collection: any): any {
        const { _id, ...restCollection } = collection;
        return Object.assign({}, restCollection, { id: _id });
    }
}
