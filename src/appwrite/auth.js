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
        console.log(`Account creation error :: ${error}`);
    }
  }

  async login({email, password}){
    try {
    const loginSeccion = await this.account.createEmailSession(email, password);
    return loginSeccion;
    } catch (error) {
        console.log(`Login error :: ${error}`);
    }
  }


}

const authService = new AuthService();

export default AuthService;
