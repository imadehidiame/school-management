//import { SectionDataTable } from "@/components/tables/section-data-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
//import { SectionColumnsDefinition } from "@/definitions/school/section-definitions";
import { School } from "@prisma/client"; // Import necessary types
import { BaseData } from "../definitions";
import { SectionData } from "@/definitions/school/section-data";
import { ClassData } from "@/definitions/school/class-data";
import { ClassDataTable } from "@/components/tables/class-data-table";
import React from 'react'; // Import React
//import { ClassColumnsDefinition } from "@/definitions/school/class-definitions";
import { ArmColumnsDefinition } from "@/definitions/school/arm-definitions";
import { ArmData } from "@/definitions/school/arm-data";
import { ArmDataTable } from "@/components/tables/arm-data-table";

interface ClassComponentProps {
    base_data: BaseData;
    section_data: SectionData[];
    school_data: School[];
    class_data: ClassData[];
    arm_data: ArmData[];
}

const ArmComponent: React.FC<ClassComponentProps> = ({ base_data, section_data, school_data, class_data, arm_data }) => {

    if (!base_data) {
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

    if (school_data.length < 1) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Please Create A {base_data.school_naming} Information</CardTitle>
                    <CardDescription>
                        Create at least a {base_data.school_naming} information before proceeding.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    if (section_data.length < 1) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Please Create A {base_data.section_naming} Information</CardTitle>
                    <CardDescription>
                        Create at least a {base_data.section_naming} information before proceeding.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    if (class_data.length < 1) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Please Create A {base_data.class_naming} Information</CardTitle>
                    <CardDescription>
                        Create at least a {base_data.class_naming} information before proceeding.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create {base_data.arm_naming} Data</CardTitle>
                <CardDescription>
                    Register {base_data.arm_naming.toLocaleLowerCase()} information in the database.
                </CardDescription>
            </CardHeader>
 
            <CardContent className="space-y-2">
                <ArmDataTable
                    data={arm_data}
                    empty_data_message={`No ${base_data.class_naming.toLocaleLowerCase()} information registered yet`}
                    filters={[
                        /**
                         id: string;
                             arm_name: string;
                             name_alias:string;
                             school_class_id: string;
                             createdAt: string;
                             updatedAt: string;
                             arm_class: string;
                             school_class: SchoolClasses;
                         */
                        {
                            column: 'arm_name',
                            placeholder: `Search by ${base_data.arm_naming}`,
                            select_box_name: `${base_data.arm_naming} filter`,
                        },
                        {
                            column: 'arm_class',
                            placeholder: `Search by ${base_data.class_naming}`,
                            select_box_name: `${base_data.class_naming} filter`, 
                        },
                    ]}
                    paginations={[10, 20]}
                    columns={ArmColumnsDefinition}
                />
            </CardContent>
            <CardFooter /> {/* Empty CardFooter */}
        </Card>
    );
};

export default ArmComponent;