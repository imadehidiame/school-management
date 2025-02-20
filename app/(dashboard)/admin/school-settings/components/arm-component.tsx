//import { SectionDataTable } from "@/components/tables/section-data-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
//import { SectionColumnsDefinition } from "@/definitions/school/section-definitions";
import React from 'react'; // Import React
//import { ClassColumnsDefinition } from "@/definitions/school/class-definitions";
import { ArmColumnsDefinition } from "@/definitions/school/arm-definitions";
import { ArmDataTable } from "@/components/tables/arm-data-table";
import useArmStore from "@/stores/school-settings/use-arm-store";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import useClassStore from "@/stores/school-settings/use-class-store";



const ArmComponent: React.FC = () => {
    const { data } = useBaseSchoolStore();
    const {} = useArmStore();
    const { schools } = useSchoolStore();
    const { schoolSections } = useSchoolSectionStore();
    const { classData } = useClassStore();


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

    if (classData.length < 1) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Please Create A {data.class_naming} Information</CardTitle>
                    <CardDescription>
                        Create at least a {data.class_naming} information before proceeding.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create {data.arm_naming} Data</CardTitle>
                <CardDescription>
                    Register {data.arm_naming.toLocaleLowerCase()} information in the database.
                </CardDescription>
            </CardHeader>
 
            <CardContent className="space-y-2">
                <ArmDataTable
                    data={useArmStore.getState().armData}
                    empty_data_message={`No ${data.class_naming.toLocaleLowerCase()} information registered yet`}
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
                            placeholder: `Search by ${data.arm_naming}`,
                            select_box_name: `${data.arm_naming} filter`,
                        },
                        {
                            column: 'arm_class',
                            placeholder: `Search by ${data.class_naming}`,
                            select_box_name: `${data.class_naming} filter`, 
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