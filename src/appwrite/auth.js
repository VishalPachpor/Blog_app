import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({email, password, name}){
    try {
        const userAccount =   await this.account.create(ID.unique(), email, password, name);
        if(userAccount){
            // return another methdo
            return this.login({email, password})
        }else{
            return userAccount
        }

    } catch (error) {
        console.log(`Appwrite services :: Account creation error :: ${error}`);
    }
  }

  async login({email, password}){
    try {
    const loginSeccion = await this.account.createEmailSession(email, password);
    return loginSeccion;
    } catch (error) {
        console.log(`Appwrite services :: Login error :: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get()
        
    } catch (error) {
        console.log(`Appwrite services :: Current user error :: ${error}`)
    }
    return null;
  }

    async logout() {
        try {
            const logout = await this.account.deleteSessions();
            return logout
            
        } catch (error) {
            console.log(`Appwrite service error :: Logout error :: ${error}`)
        }
    }


}

const authService = new AuthService();

export default AuthService;
