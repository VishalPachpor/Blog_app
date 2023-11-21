import conf from "../config/config";
import { Databases, Storage, Client, ID, Query } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;
    
}

const service = new Service()

export default service;