'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import PersonInfoContainer from "./profile";
import { Parent, Student } from "@prisma/client";
import ParentForm from "./parent-form";
import useParentStore from "@/stores/parents/use-parent-store";
import { useEffect, useState } from "react";

interface PageProps {
    parent_data: ParentStudentProps;
}

interface ParentStudentProps extends Parent {
    children: Student[];
}

const ParentPage: React.FC<PageProps> = ({ parent_data }) => {
    const [form_key, set_form_key] = useState(Math.random());
    
    useEffect(() => {
        if (parent_data && parent_data.id) {
            useParentStore.setState({ current_parent: parent_data });
            set_form_key(Math.random());
        }
    }, [parent_data]);

    return (
        <>
            <Card className="w-[98%] h-auto max-h-full">
                <CardHeader className='p-2 sm:p-4 md:p-6,'>
                    <CardTitle>Parent Profile</CardTitle>
                    <CardDescription>
                        {parent_data.firstName + " " + parent_data.lastName + "'s Profile"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 p-2 sm:p-4 md:p-6">
                    <PersonInfoContainer
                        backgroundImage="/profile_bg.jpg"
                        personImage={`${parent_data.photo?.split('<=>')[0]}`}
                        personName={`${parent_data.firstName} ${parent_data.lastName}`}
                        address={parent_data.address}
                        email={parent_data.email}
                        mobile={parent_data.phoneNumber}
                        occupation={parent_data.occupation}
                        wards={parent_data.children.length}
                        facebook={parent_data.facebook ? parent_data.facebook : 'n/a'}
                        linkedin={parent_data.linkedin ? parent_data.linkedin : 'n/a'}
                        twitter={parent_data.twitter ? parent_data.twitter : 'n/a'}
                    />
                    <ParentForm key={form_key} />
                </CardContent>
                <CardFooter />
            </Card>
        </>
    );
};

export default ParentPage;