import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('college-db'); // Check if this is your PROJECT ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };