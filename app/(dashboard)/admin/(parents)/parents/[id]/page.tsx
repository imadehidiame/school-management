import { prisma } from '@/prisma';
import { redirect } from 'next/navigation';
//import Error from '@/app/(user_test)/user_valid/components/err_page';
import ErrorPage from '@/components/error-page';
import ParentPage from '../components/parent-page';

export default async function ParentProfilePage({params}:{params:Promise<{id:string}>}) {
  try {
    const { id } = await params;
    const parent_data = await prisma.parent.findFirst({where:{
      id
    },include:{
      children:true
    }});
    
  if(!parent_data)
      throw new Error(`No parent with ID [${id}] found`,{cause:'invalid'});
      //redirect('/admin/parents');  

      return  <ParentPage parent_data={parent_data} /> 


  } catch (error) {
    console.log(error);
    if(error instanceof Error){
      if(error?.cause == 'invalid'){
        return <ErrorPage title={error.message} />    
      }
    }
    return <ErrorPage title={`An unknown error occured`} />
  }

  
 
}