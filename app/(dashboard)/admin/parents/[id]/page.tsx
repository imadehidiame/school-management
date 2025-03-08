// pages/test-image.js
import Image from 'next/image';
import PersonInfoContainer from './profile';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestImagePage() {
  return (
    <>
    {/*<div>
      <div className="hidden sm:block relative">
        <Image
          src="https://res.cloudinary.com/dulpu5zkx/image/upload/v1741106088/1741105968233_427758.jpg"
          alt="Test Image"
          fill
          style={{ objectFit: 'cover' }}
      ,  />
      </div>
    </d8iv>
    ik8,*/}
          <Card className="w-[98%]"> 
            <CardHeader className='p-2 sm:p-4 md:p-6'>
                <CardTitle>Parent Profile</CardTitle>
                <CardDescription> 
                    Register parent information in the database.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 p-2 sm:p-4 md:p-6">
            <PersonInfoContainer
      backgroundImage="/profile_bg.jpg"
      personImage="https://res.cloudinary.com/dulpu5zkx/image/upload/v1741106088/1741105968233_427758.jpg"
      personName="John Doe"
      info1="Age: 30"
      info2="Location: City"
      info3="Occupation: Developer"
    />            
            </CardContent>
            <CardFooter /> {/* Empty CardFooter */}
        </Card>

    
    </>
  );
}