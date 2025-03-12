'use client';

import LoadLink from '@/components/load-link';
import { Building, Home, Mail, Phone, Smartphone, AtSign, Send, Briefcase, MapPin, User, Baby, X, Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface PersonInfoContainerProps {
  backgroundImage: string;
  personImage: string;
  personName: string;
  wards?: number | 0;
  occupation?: string | null;
  mobile?: string | null;
  email?: string | null;
  address?: string | null;
  twitter?: string | null | undefined;
  facebook?: string | null | undefined;
  linkedin?: string | null | undefined;
}

const PersonInfoContainer: React.FC<PersonInfoContainerProps> = ({
  backgroundImage,
  personImage,
  personName,
  wards,
  occupation,
  mobile,
  email,
  address,
  twitter = 'undefined',
  facebook = 'undefined',
  linkedin = 'undefined',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="relative bg-cover bg-center px-2 py-4 md:py-8 md:px-8 rounded-lg text-white"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div
          className="hidden xl:block absolute top-0 left-0 h-full w-full xl:w-[70%] bg-blue-500 opacity-25"
          style={{
            clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)',
            zIndex: 1,
          }}
        ></div>

        <div className="flex flex-col xl:flex-row items-center justify-center xl:justify-start" style={{ zIndex: 2 }}>
          <div
            className="w-full xl:w-[300px] p-2 bg-blue-300 opacity-55 relative flex-shrink-0"
            style={{ zIndex: 3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`absolute top-0 left-0 bg-blue-700 text-white w-[50px] h-[180px] flex flex-col gap-2 items-center px-1 py-3 transition-transform duration-300 ease-out-expo ${
                isHovered ? 'translate-y-0' : 'hidden'
              }`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 100% )', zIndex: 5 }}
            >
              <Link href={twitter && twitter.includes('x.com') ? twitter : 'https://x.com/' + twitter} target="_blank">
                <X className="w-6 h-6" />
              </Link>
              <Link href={facebook && facebook.includes('facebook.com') ? facebook : 'https://facebook.com/' + facebook} target="_blank">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href={linkedin && linkedin.includes('linkedin.com') ? linkedin : 'https://linkedin.com/' + linkedin} target="_blank">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
            <div className="w-full sm:w-[300px] h-[300px] sm:h-[300px] rounded-lg overflow-hidden p-2 relative shadow-lg mx-auto" style={{ zIndex: 4 }}>
              <Image src={personImage} alt={personName} fill style={{ objectFit: 'cover' }} className="rounded-lg" />
            </div>
          </div>

          <div className="flex flex-col mt-4 xl:mt-0 gap-2 ml-0 xl:ml-4">
            <div className="flex items-center mb-2">
              <User className="w-6 h-6 mr-2 animate-pulse" />
              <span>{personName}</span>
            </div>
            <div className="flex items-center mb-2">
              <Baby className="w-6 h-6 mr-2 animate-bounce" />
              <span>{`${wards} ward${wards && wards > 1 ? 's' : ''} registered`}</span>
            </div>
            <div className="flex items-center mb-2">
              <Briefcase className="w-6 h-6 mr-2 animate-pulse" />
              <span>{occupation ? occupation : 'N/A'}</span>
            </div>
            <div className="flex items-center mb-2">
              <Smartphone className="w-6 h-6 mr-2 animate-bounce" />
              <span>{mobile}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-2 animate-pulse" />
              <span>{email}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2 animate-bounce" />
              <span>{address}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-2 space-y-2'>

      <div className="px-8 py-4 max-sm:px-3 max-md:px-5 max-sm:py-3 max-md:py-3 flex rounded-lg bg-white shadow-2xl ring-1 ring-slate-900/5">
        <div className="h-[150px] max-sm:h-[90px] max-md:h-[110px] max-lg:h-[130px] lg:h-[150px] xl:h-[140px] w-[150px] max-sm:w-[90px] max-md:w-[110px] max-lg:w-[130px] lg:w-[150px] xl:w-[140px] relative">
          <Image src={`${personImage}`} alt={'child'} fill style={{ objectFit: 'cover' }} className="rounded-full" />
        </div>
        <div className="flex flex-col w-[80%] justify-between max-sm:ml-3 ml-4">
          <div className="mb-2 max-sm:mb-2">
            <h5 className="text-sm font-light max-md:text-sm max-lg:text-lg lg:text-xl">Osato Imade</h5>
            <p className="text-xs max-md:text-xs max-lg:text-sm lg:text-lg font-medium">Class: Primary 4</p>
          </div>

          <div className="space-y-2 max-sm:mt-2">
            <hr className="my-2 border-t border-gray-300 w-full" />
            <div className="flex justify-end">
              <LoadLink href={'/student'} is_sidebar_link='false' className='max-sm:text-xs text-sm'>Profile</LoadLink>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 max-sm:px-3 max-md:px-5 max-sm:py-3 max-md:py-3 flex rounded-lg bg-white shadow-2xl ring-1 ring-slate-900/5">
        <div className="h-[150px] max-sm:h-[90px] max-md:h-[110px] max-lg:h-[130px] lg:h-[150px] xl:h-[140px] w-[150px] max-sm:w-[90px] max-md:w-[110px] max-lg:w-[130px] lg:w-[150px] xl:w-[140px] relative">
          <Image src={`${personImage}`} alt={'child'} fill style={{ objectFit: 'cover' }} className="rounded-full" />
        </div>
        <div className="flex flex-col w-[80%] justify-between max-sm:ml-3 ml-4">
          <div className="mb-2 max-sm:mb-2">
            <h5 className="text-sm font-light max-md:text-sm max-lg:text-lg lg:text-xl">Osato Imade</h5>
            <p className="text-xs max-md:text-xs max-lg:text-sm lg:text-lg font-medium">Class: Primary 4</p>
          </div>

          <div className="space-y-2 max-sm:mt-2">
            <hr className="my-2 border-t border-gray-300 w-full" />
            <div className="flex justify-end">
              <LoadLink href={'/student'} is_sidebar_link='false' className='max-sm:text-xs text-sm'>Profile</LoadLink>
            </div>
          </div>
        </div>
      </div>


      </div>
      
    </>
  );
};

export default PersonInfoContainer;