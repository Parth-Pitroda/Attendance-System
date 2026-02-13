import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('college-db');

export const account = new Account(client);
export const databases = new Databases(client);