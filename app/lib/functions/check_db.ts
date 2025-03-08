'use server';

import { prisma } from "@/prisma";

export async function check_db_table(table_name: string,is_single:boolean=true,where:Record<string,any> = {}) {
    let check;
    switch (table_name) {
        case 'user':
            check = is_single ? await prisma.user.findFirst({where}) : await prisma.user.findMany({where})
        break;
        // Add more cases for other tables
        default:
            throw new Error(`Table ${table_name} not found`);
    }
    return check;
}
