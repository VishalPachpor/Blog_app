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
            return updatedpost;
            
        } catch (error) {
            console.log(`Appwrite service :: Update post error :: ${error}`)
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log(`Appwrite service :: Delete post error :: ${error}`)
            return false
        }
    }

    async getPost(slug){
        try {
            const selectedPost = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return selectedPost
        } catch (error) {
            console.log(`Appwrite service :: Get post error ::${error}`)
        }
    }

    async getPosts(query = [Query.equal("status", "active")]){
        try {
            const posts = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
            )
            return posts
            
        } catch (error) {
            console.log(`Appwrite Services :: Get all posts error :: ${error}`)
            return false
        }
    }

    /// File Upload service

    async fileUpload(file){
        try {
            const fileuploaded = await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
            return fileuploaded

        } catch (error) {
            console.log(`Appwrite service :: File upload error :: ${error}`)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId)
                return true
        } catch (error) {
            console.log(`Appwrite services :: Delete file error :: ${error}`)
            return false
        }
    }

    async getFilePreview(fileId){
        const previewFile = await this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
        return previewFile
    }
}

const service = new Service()

export default service;