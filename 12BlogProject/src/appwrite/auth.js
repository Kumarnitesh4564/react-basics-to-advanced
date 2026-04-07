import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),   // ✅ NOT object
                email,
                password,
                name
            );

            if (userAccount) {
                return await this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,   // ✅ NOT object
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;