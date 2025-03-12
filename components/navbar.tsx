'use client';
import Image from "next/image";
import NavbarImage from "./navbar-image";
import { Menu as MenuIcon } from 'lucide-react'; // Import MenuIcon

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    
    return (
        <div className="flex items-center justify-between p-4">
            {/* Hamburger Menu Button (Mobile) */}
            <button className="lg:hidden" onClick={onMenuClick}>
                <MenuIcon />
            </button>

            {/* Search bar */}
            <div className="hidden md:flex md:ml-4 items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image src={'/search.png'} alt="" height={14} width={14} />
                <input type="text" placeholder="Search" className="w-[200px] md:w-[400px] p-2 bg-transparent outline-none" />
            </div>

            {/* ICONs and User */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <Image src={'/message.png'} alt="message" height={20} width={20} />
                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                    <Image src={'/announcement.png'} alt="message" height={20} width={20} />
                    <div className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center bg-blue-700 text-white rounded-full text-xs">
                        1
                    </div>
                </div>
                {/* USER info */}
                <NavbarImage />
            </div>
        </div>
    );
}