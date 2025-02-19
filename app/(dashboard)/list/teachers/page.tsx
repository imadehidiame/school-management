'use client';
import TableSearch from "@/components/table-search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Table from "@/components/table";
import Pagination from "@/components/pagination";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { teachers_data } from "./data";

type Teacher = {
    id:number;
    teacher_id:string;
    name:string;
    email:string;
    photo:string;
    phone:string;
    subjects:string[],
    classes:string[],
    address:string;
}

const columns = [
    {
        header:'Info',accessor:'info'
    },
    {
        header:'Teacher ID',accessor:'teacher_id',className:'hidden md:table-cell'
    },
    {
        header:'Subjects',accessor:'subjects',className:'hidden md:table-cell'
    },
    {
        header:'Classes',accessor:'classes',className:'hidden md:table-cell'
    },
    {
        header:'Phone',accessor:'phone',className:'hidden lg:table-cell'
    },
    {
        header:'Address',accessor:'address',className:'hidden lg:table-cell'
    },
    {
        header:'Actions',accessor:'action'
    }
];




export default function TeachersList(){
    const { data:session } = useSession();
    const role = session?.user.role; 
    //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    //console.log('Base url ',baseUrl);

    const render_row = (item:Teacher)=>(
        
        <tr key={item.id} className="boreder-b border-gray-200 even:bg-slate-50 text-sm hover:bg-light-cyan">
           <td className="flex items-center gap-4 p-4">
                <Image src={item.photo} alt="Image" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">
                {item.teacher_id}
            </td>
            <td className="hidden md:table-cell">
            {item.subjects.join(', ').trim()}
            </td>
            <td className="hidden md:table-cell">
                {item.classes.join(', ').trim()}
            </td>
            <td className="hidden md:table-cell">
                {item.phone}
            </td>
            <td className="hidden md:table-cell">
                {item.classes}
            </td> 
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                    <Button variant={'ghost'} size={'icon'} className="w-7 h-7 flex items-center rounded-full bg-pagination-blue">
                        <Image src={'/view.png'} alt="teacher's image" width={16} height={16} />
                    </Button>
                    </Link>
                    {(role as string === 'admin') && <Button variant={'ghost'} size={'icon'} className="w-7 h-7 flex items-center rounded-full bg-royal-blue">
                        <Image src={'/delete.png'} alt="teacher's image" width={16} height={16} />
                    </Button>}
                </div>
                
            </td> 
        </tr>
    
    )

    return (
        <div className="p-4 bg-white rounded-md flex-1 m-4 mt-0">
            {/**TOP */}
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <Button variant={'ghost'} size={'icon'} className="w-8 h-8 flex items-center justify-center rounded-full bg-deep-sky-blue">
                            <Image src={`/filter.png`} alt="filter" width={14} height={14} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'} className="w-8 h-8 flex items-center justify-center rounded-full bg-deep-sky-blue">
                            <Image src={`/sort.png`} alt="filter" width={14} height={14} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'} className="w-8 h-8 flex items-center justify-center rounded-full bg-deep-sky-blue">
                            <Image src={`/plus.png`} alt="filter" width={14} height={14} />
                        </Button>
                    </div>
                </div>
            </div>

            {/**LIST */}
                <Table columns={columns} row={render_row} data={teachers_data} />
            
            {/**PAGINATION */}
            <Pagination />
        </div>
    );
}