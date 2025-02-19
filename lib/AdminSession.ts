//import 'server-only';
import { PrismaClient } from "@prisma/client";

//import { admin_session_table } from "@/definitions/auth_db_definition";

export class AdminSessionDB {
    private static prisma:PrismaClient = new PrismaClient();
    //private static table = AdminSessionDB.prisma['adminSession'];
    //private static prisma:PrismaClient = new PrismaClient();
    private static table = AdminSessionDB.prisma['user'];
        

    private static async success<T>(e:T){
        await AdminSessionDB.prisma.$disconnect();
        return e;
    }

    private static async error(e:any){
        console.error(e);
        await AdminSessionDB.prisma.$disconnect();
    }

    
    public static async get(where={},select={},is_check = false){ 
        let ret:boolean|object|null; 
        if(is_check){
        let check = await AdminSessionDB.table.count({where}).then(AdminSessionDB.success);//.catch(AdminDB.error);
        ret = check > 0;
        }
        //ret = check ? true : false;    
        else{
        ret = await AdminSessionDB.table.findFirst({where,select}).then(AdminSessionDB.success);
        }
        return ret;
    }
    
}