import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from "@prisma/client"; // Import necessary types
import { BaseData } from "../definitions";
import { SectionData } from "@/definitions/school/section-data";
import { ClassData } from "@/definitions/school/class-data";
import { ClassDataTable } from "@/components/tables/school-settings/class-data-table";
import React, { useEffect, useState } from 'react'; // Import React
import { ClassColumnsDefinition } from "@/definitions/school/class-definitions";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import useClassStore from "@/stores/school-settings/use-class-store";

interface ClassComponentProps {
    base_data: BaseData;
    section_data: SectionData[];
    school_data: School[];
    class_data: ClassData[];
}

const ClassComponent: React.FC = () => {
    const { data } = useBaseSchoolStore();
    const { schoolSections } = useSchoolSectionStore();
    const { schools } = useSchoolStore();
    const { classData } = useClassStore();

    const [table_key,set_table_key] = useState(1);
    useEffect(()=>{
        set_table_key(prev=>prev+1);
    },[classData]);
    

    if (!data) {
        return (
            <Card className="w-[50%]">
                <CardHeader>
                    <CardTitle>Please Create School Naming Conventions</CardTitle>
                    <CardDescription>
                        Create naming conventions for schools, sections, classes, and arms before proceeding.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    if (schools.length < 1) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Please Create A {data.school_naming} Information</CardTitle>
                    <CardDescription>
                        Create at least a {data.school_naming} information before proceeding.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    if (schoolSections.length < 1) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Please Create A {data.section_naming} Information</CardTitle>
                    <CardDescription>
                        Create at least a {data.section_naming} information before proceeding.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create {data.class_naming} Data</CardTitle>
                <CardDescription>
                    Register {data.section_naming.toLocaleLowerCase()} information in the database.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <ClassDataTable
                    key={table_key}
                    data={useClassStore.getState().classData}
                    empty_data_message={`No ${data.class_naming.toLocaleLowerCase()} information registered yet`}
                    filters={[
                        {
                            column: 'class_section',
                            placeholder: `Sort by ${data.school_naming}`,
                            select_box_name: `${data.section_naming} filter`,
                        },
                        {
                            column: 'class_name',
                            placeholder: `Sort by ${data.class_naming}`,
                            select_box_name: `${data.class_naming} filter`,
                        },
                    ]}
                    paginations={[10, 20]}
                    columns={ClassColumnsDefinition}
                />
            </CardContent>
            <CardFooter /> {/* Empty CardFooter */}
        </Card>
    );
};

export default ClassComponent;