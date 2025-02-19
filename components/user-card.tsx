import Image from "next/image";

export default function UserCard({type}:{type:string}){
    return (
        <div className="rounded-2xl odd:bg-app_blue_default even:bg-gainsboro p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">28/01/2025</span>
                <Image src={'/more.png'} alt="" width={20} height={20} />
            </div>
            <h1 className="text-2xl font-semibold my-4">1,240</h1>
            <h2 className="capitalize text-sm font-medium text-gray-700">{type+'s'}</h2>
        </div>
    )
}