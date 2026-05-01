import config from '../config/config.js';
import { Client, ID, Databases, Query } from "appwrite";

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
                ID.unique(),
                { title, slug, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("createPost error", error);
            if (error.message?.includes('Unknown attribute: "slug"') || error.message?.includes('Invalid document structure')) {
                throw new Error('Appwrite collection is missing the slug attribute. Add a string attribute named "slug" in your Appwrite collection schema.');
            }
            throw error;
        }
    }

    async updatePost(documentId, { title, slug, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                documentId,
                { title, slug, content, featuredImage, status }
            );
        } catch (error) {
            console.error("updatePost error", error);
            if (error.message?.includes('Unknown attribute: "slug"') || error.message?.includes('Invalid document structure')) {
                throw new Error('Appwrite collection is missing the slug attribute. Add a string attribute named "slug" in your Appwrite collection schema.');
            }
            return null;
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                documentId
            );
            return true;
        } catch (error) {
            console.error("deletePost error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const result = await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                [Query.equal("slug", slug)]
            );

            return result.documents?.[0] || null;
        } catch (error) {
            console.error("getPost error", error);
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