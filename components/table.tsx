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

export default function Table({columns,row,data}:{columns:{header:string,accessor:string,className?:string}[],row:(item:Teacher)=>React.ReactNode,data:Teacher[]}){
    return (
        <table className="w-full mt-4">
            <thead>
                <tr className="text-left text-gray-500 text-sm">
                    {
                        columns.map((e)=>{
                            return (<th key={e.accessor} className={e.className}>{e.header}</th>)
                        })
                    }
                </tr>
            </thead>
                <tbody>
                    {
                        data.map((e)=>row(e))
                    }
                </tbody>
        </table>
    )
}