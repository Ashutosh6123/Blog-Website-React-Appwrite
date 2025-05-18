import config from '../config/config.js';
import {Client, ID, Databases, Storage, Query} from 'appwrite';


/*
The Databases service allows you to create structured collections of documents, query and filter lists of documents, and manage an advanced set of read and write access permissions.

All data returned by the Databases service are represented as structured JSON documents.

The Databases service can contain multiple databases, each database can contain multiple collections. A collection is a group of similarly structured documents. The accepted structure of documents is defined by collection attributes. The collection attributes help you ensure all your user-submitted data is validated and stored according to the collection structure.
*/


export class DBService{
    client = new Client();
    databases;
    bucket;

    // account tab banna chahiye jab constructor call ho
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId)

        this.databases = new Databases(this.client);

        this.bucket = new Storage(this.client);
    }

    async createPost({title, content, featuredImage, status, userId}){

        const slug = title.toLowerCase().replace(/ /g, '-');
        /*
            Above line of code transforms a given title string into a URL-friendly "slug". Here's a step-by-step breakdown:
                1. title.toLowerCase(): Converts the entire title string to lowercase letters. This ensures that the slug is case-insensitive.
                2. .replace(/ /g, '-'): Replaces all spaces in the title string with hyphens (-). The regular expression / /g matches all spaces globally in the string.
        */

        try {
            return await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                slug, // slug is the Document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite error :: createPost :: error: ", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite error :: updatePost :: error : ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite error :: deletedPost :: error : ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.collectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite error :: getPost :: , error : ", error);
            return false; // if the post is not found, return false
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            
            return await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                queries
            )

        } catch (error) {
            console.log("Appwrite error :: getPosts :: ", error);            
        }
    }

    // Uploads the image to the bucket and returns the file ID

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.bucketId, // bucket where file will be uploaded
                ID.unique(), // unique ID for the file
                file // actual file to be uploaded
            )
        }
        catch (error) {
            console.log("Appwrite error :: uploadFile :: ", error);

            return false; // since in JS function return type is not fixed, we can return false if the file upload fails and return the response if it is successful.
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.bucketId,
                fileId // file ID to be deleted
            )
            return true; // file deleted successfully
        } catch (error) {
            console.log("Appwrite error :: deleteFile :: ", error);
            return false;            
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.bucketId,
            fileId
        )
    }

}

const dbService = new DBService();

export default dbService;
