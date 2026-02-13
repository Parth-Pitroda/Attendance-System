import { Account, Client, Databases, ID } from "appwrite";

const client = new Client();

client.setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("college-db");

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };

