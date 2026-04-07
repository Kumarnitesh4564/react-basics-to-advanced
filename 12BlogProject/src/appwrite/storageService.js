import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from '../config/config.js';

export class StorageService {
    client = new Client;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("uploadFile error", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("deleteFile error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) return null;
        try {
            // Use Appwrite SDK's getFileView method for viewing files
            const url = this.bucket.getFileView(
                config.appWriteBucketId,
                fileId
            );
            // Convert URL object to string if needed
            return url.href || url.toString() || url;
        } catch (error) {
            console.log("getFilePreview error:", error);
            // Fallback: Construct URL manually
            try {
                const fallbackUrl = `${config.appWriteUrl}/storage/buckets/${config.appWriteBucketId}/files/${fileId}/view?project=${config.appWriteProjectId}`;
                return fallbackUrl;
            } catch (fallbackError) {
                console.log("Fallback URL error:", fallbackError);
                return null;
            }
        }
    }

}

const storageService = new StorageService();
export default storageService;