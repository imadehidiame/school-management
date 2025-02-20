'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CreateUserForm } from "./components";
import { useEffect, useState } from "react";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import axios_request from "@/lib/axios_request";
import { signOut } from "next-auth/react";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import { BaseSchoolCategory } from "@prisma/client";

export function TabTest({data}:{data:BaseSchoolCategory|null}) {
  const [is_loading,set_is_loading] = useState(false);
  //const school_store = useSchoolStore();
  //const base_school_store = useBaseSchoolStore();
  //const section_store = useSchoolSectionStore();
  
  useEffect(()=>{
    useBaseSchoolStore.setState({data})
    set_is_loading(true);
  },[data]);

  if(!is_loading)
  return null;

  return (
    <Tabs defaultValue="account" className="w-full p-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="account">Assign User Roles</TabsTrigger>
        <TabsTrigger value="parent">Parent</TabsTrigger>
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="teacher">Teacher</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <CreateUserForm />
      </TabsContent>

      <TabsContent value="parent">
        <CreateUserForm />
      </TabsContent>

      <TabsContent value="student">
        <CreateUserForm />
      </TabsContent>

      <TabsContent value="teacher">
        <CreateUserForm />
      </TabsContent>
  </Tabs>
  )
}
