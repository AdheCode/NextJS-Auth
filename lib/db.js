import { MongoClient } from 'mongodb';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export async function connectToDatabase(){

    const connectionString = `mongodb+srv://${serverRuntimeConfig.mongodb_username}:${serverRuntimeConfig.mongodb_password}@${serverRuntimeConfig.mongodb_clustername}.ullmy.mongodb.net/${serverRuntimeConfig.mongodb_database}?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(connectionString);

    return client;
}