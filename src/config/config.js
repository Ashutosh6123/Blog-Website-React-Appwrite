// This file contains the configuration for the Appwrite SDK.
// It exports an object with the environment variables needed to connect to Appwrite.
// The variables are loaded from the .env file using import.meta.env.Variable_name
// The variables are cast to strings to ensure they are in the correct format
const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config;