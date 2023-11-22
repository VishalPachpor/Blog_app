import conf from "../config/config";
import { Databases, Storage, Client, ID, Query } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug,content, featuredImage, status, userId}){
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log(`Appwrite service :: create post error :: ${error}`)
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            const updatedpost = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
                
            )
            
        } catch (error) {
            console.log(`Appwrite service :: Update post error :: ${error}`)
        }
    }

}

const service = new Service()

export default service;