import { prisma } from '@/prisma';
import { TabTest } from './tab-test';



export default async function CreateUser(){

  const base_data = await prisma.baseSchoolCategory.findFirst();

    
    return (
      <TabTest data={base_data} />
    );

}

