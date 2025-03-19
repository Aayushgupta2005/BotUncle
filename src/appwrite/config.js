import conf from '../conf/conf.js';
import { Client, ID, Databases} from "appwrite";
import { Query } from "appwrite";
export class Service{
    client = new Client();
    databases;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }
    async createFAQ({question, answer , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    question,
                    answer,
                    user_id : userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createFAQ :: error", error);
        }
    }

    async updateFAQ(slug, {question,answer}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    question,
                    answer,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateFAQ :: error", error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFAQ :: error", error);
            return false
        }
    }

    async getFAQ(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getFAQ :: error", error);
            return false
        }
    }
    
    async getFAQs(userId) {
        console.log(userId);
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("user_id", userId)] // ✅ Correct format
            );
        } catch (error) {
            console.log("Appwrite service :: getFAQs :: error", error);
            return false;
        }
    }
    
}

const service = new Service()
export default service 