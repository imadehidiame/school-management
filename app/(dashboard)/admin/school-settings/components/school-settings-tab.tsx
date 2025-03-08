'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { NamingConventionComponent } from "./naming-convention-component";
import SchoolComponent from "./school-component";
import SectionComponent from "./section-component";

import { useEffect, useState} from "react";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
//import axios_request from "@/lib/axios_request";
//import { signOut } from "next-auth/react";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import { BaseSchoolCategory, School, SchoolSessions } from "@prisma/client";
//import { z } from "zod";
//import { BaseData } from "../definitions";
import { SectionData } from "@/definitions/school/section-data";
import { ClassData } from "@/definitions/school/class-data";
import useClassStore from "@/stores/school-settings/use-class-store";
import ClassComponent from "./class-component";
import { ArmData } from "@/definitions/school/arm-data";
import useArmStore from "@/stores/school-settings/use-arm-store";
import ArmComponent from "./arm-component";
import useSchoolSessionStore from "@/stores/school-settings/use-session-store";
import SessionsComponent from "./sessions-component";


interface PageProps {
    base_data:BaseSchoolCategory|null,
    school_data:School[],
    section_data:SectionData[],
    class_data:ClassData[],
    arm_data:ArmData[],
    school_sessions:SchoolSessions[]
}




export function SchoolSettingsTab({base_data,school_data,section_data,class_data,arm_data,school_sessions}:PageProps) {
  const [activeTab, setActiveTab] = useState("school_naming");
  
  useEffect(()=>{
    useBaseSchoolStore.setState({data:base_data});
    useSchoolStore.setState({schools:school_data});
    useSchoolSectionStore.setState({schoolSections:section_data});
    useClassStore.setState({classData:class_data});
    useArmStore.setState({armData:arm_data});
    useSchoolSessionStore.setState({sessions:school_sessions});
  },[base_data,school_data,section_data,arm_data,school_sessions,class_data]);

  return (
    <Tabs
      defaultValue="school_naming"
      className="w-full p-4"
      value={activeTab} // Control the active tab with state
      onValueChange={setActiveTab} // Update state on tab change
    >
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger className="px-1 py-1 text-sm" value="school_naming">Naming Conventions</TabsTrigger>
        <TabsTrigger className="px-1 py-1 text-sm" value="school">Schools</TabsTrigger>
        <TabsTrigger className="px-1 py-1 text-sm" value="section">Sections</TabsTrigger>
        <TabsTrigger className="px-1 py-1 text-sm" value="classes">Classes</TabsTrigger>
        <TabsTrigger className="px-1 py-1 text-sm" value="arms">Arms</TabsTrigger>
        <TabsTrigger className="px-1 py-1 text-sm" value="sessions">Sessions</TabsTrigger>
      </TabsList>

      <TabsContent value="school_naming" className="flex items-center justify-center">
        {activeTab === "school_naming" && <NamingConventionComponent base_data={base_data} />} {/* Conditional rendering based on state */}
      </TabsContent>

      <TabsContent value="school" className="flex items-center justify-center">
        {activeTab === "school" && <SchoolComponent />}
      </TabsContent>

      <TabsContent value="section" className="flex items-center justify-center">
        {activeTab === "section" && <SectionComponent />}
      </TabsContent>

      <TabsContent value="classes" className="flex items-center justify-center">
        {activeTab === "classes" && <ClassComponent />}
      </TabsContent>  

      <TabsContent value="arms" className="flex items-center justify-center">
        {activeTab === "arms" && <ArmComponent />} 
      </TabsContent> 

      <TabsContent value="sessions" className="flex items-center justify-center">
        {activeTab === "sessions" && <SessionsComponent />}
      </TabsContent> 

    </Tabs>
  );
}
