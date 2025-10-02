import { Client,Account, Avatars , Databases} from "appwrite";

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

if (!projectId) {
    console.error('Project ID is not defined in environment variables');
}

export const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);