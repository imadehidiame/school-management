import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from "@prisma/client"; // Import necessary types
import { BaseData } from "../definitions";
import { SectionData } from "@/definitions/school/section-data";
import { ClassData } from "@/definitions/school/class-data";
import { ClassDataTable } from "@/components/tables/class-data-table";
import React from 'react'; // Import React
import { ClassColumnsDefinition } from "@/definitions/school/class-definitions";

interface ClassComponentProps {
    base_data: BaseData;
    section_data: SectionData[];
    school_data: School[];
    class_data: ClassData[];
}

const ClassComponent: React.FC<ClassComponentProps> = ({ base_data, section_data, school_data, class_data }) => {

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

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create {base_data.class_naming} Data</CardTitle>
                <CardDescription>
                    Register {base_data.section_naming.toLocaleLowerCase()} information in the database.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <ClassDataTable
                    data={class_data}
                    empty_data_message={`No ${base_data.class_naming.toLocaleLowerCase()} information registered yet`}
                    filters={[
                        {
                            column: 'class_section',
                            placeholder: `Sort by ${base_data.school_naming}`,
                            select_box_name: `${base_data.section_naming} filter`,
                        },
                        {
                            column: 'class_name',
                            placeholder: `Sort by ${base_data.class_naming}`,
                            select_box_name: `${base_data.class_naming} filter`,
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