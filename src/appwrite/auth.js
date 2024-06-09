import { Client, Account, ID } from "appwrite";
import { config } from "../config/config.js";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ userEmail, userPassword, userName }) {
    const userAccount = await this.account.create(
      ID.unique(),
      userEmail,
      userPassword,
      userName
    );
    if (userAccount) {
      return this.login({ userEmail, userPassword });
    } else {
      return userAccount;
    }
  }

  async login({ userEmail, userPassword }) {
    return await this.account.createEmailPasswordSession({
      userEmail,
      userPassword,
    });
  }

  async getCurrentUser() {
    try {
      const currentUser = this.account.get();
      if (currentUser) {
        return currentUser;
      } else {
        return "No User Present";
      }
    } catch (error) {
      console.error(
        "No User Present . Try Again :: Appwrite getCurrentUser",
        error
      );
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.error("Logout Error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
