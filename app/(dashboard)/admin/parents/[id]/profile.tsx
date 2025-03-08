'use client';

import { Building, Home, Mail, Phone, Smartphone, AtSign, Send, Briefcase, MapPin, User, Baby } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface PersonInfoContainerProps {
  backgroundImage: string;
  personImage: string;
  personName: string;
  info1: string;
  info2: string;
  info3: string;
}

const PersonInfoContainer: React.FC<PersonInfoContainerProps> = ({
  backgroundImage,
  personImage,
  personName,
  info1,
  info2,
  info3,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
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
            className={`absolute top-0 left-0 bg-black text-white w-[50px] h-[180px] flex flex-col gap-2 items-center px-1 py-3 transition-transform duration-1900 ease-out-expo ${
              isHovered ? 'translate-y-0' : 'hidden'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 100% )', zIndex: 5 }}
          >
            <User className="w-6 h-6" />
            <Baby className="w-6 h-6" />
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="w-full sm:w-[300px] h-[300px] sm:h-[300px] rounded-lg overflow-hidden p-2 relative shadow-lg mx-auto" style={{ zIndex: 4 }}>
            <Image
              src={personImage}
              alt={personName}
              layout="fill"
              fill // Added fill prop
              style={{ objectFit: 'cover' }} // Added style prop with objectFit
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col mt-4 xl:mt-0 gap-2 ml-0 xl:ml-4">
          <div className="flex items-center mb-2">
            <User className="w-6 h-6 mr-2 animate-pulse" />
            <span>{info1}</span>
          </div>
          <div className="flex items-center mb-2">
            <Baby className="w-6 h-6 mr-2 animate-bounce" />
            <span>{info1}</span>
          </div>
          <div className="flex items-center mb-2">
            <Briefcase className="w-6 h-6 mr-2 animate-pulse" />
            <span>{info1}</span>
          </div>
          <div className="flex items-center mb-2">
            <Smartphone className="w-6 h-6 mr-2 animate-bounce" />
            <span>{info2}</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-6 h-6 mr-2 animate-pulse" />
            <span>{info3}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-6 h-6 mr-2 animate-bounce" />
            <span>{info3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonInfoContainer;