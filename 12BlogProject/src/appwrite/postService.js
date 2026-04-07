import config from '../config/config.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class PostService {
    client = new Client();
    databases;
    
    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("createPost error", error);
            return null;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.log("updatePost error", error);
            return null;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("deletePost error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("getPost error", error);
            return null;
        }
    }

    async getPostsList(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("getPostsList error", error);
            return null;
        }
    }
}

const postService = new PostService();
export default postService;