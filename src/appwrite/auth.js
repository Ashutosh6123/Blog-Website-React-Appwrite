import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

// We are creating this class to encapsulate the client and account objects. This will allow us to use the client and account objects in multiple functions.
// This also provide a level of abstraction, whenever using some other service.
// This way if in future we have to change the services like form appwrite to firebase, we can just change it in this file, and it would not affect our whole project.

export class AuthService{
    client = new Client();
    account;
    // since we want to use the client and account in multiple functions, we will initialize them in the constructor.
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if(userAccount){
                return this.login({email, password});
            } else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getUser :: error: ", error);
        }

        return null; // if no user is found
    }

    async logout(){
        try {
            await this.account.deleteSession('current'); // delete the current session
            // we can use deleteSessions() to delete list of sessions
        } catch (error) {
            throw error;
        }
    }
};

const authService = new AuthService();

export default authService;