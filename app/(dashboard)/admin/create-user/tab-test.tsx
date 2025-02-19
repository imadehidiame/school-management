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
import { CreateUserForm,CreateBaseSchoolForm,Schooling, SchoolSection } from "./components";
import { useEffect, useState } from "react";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import axios_request from "@/lib/axios_request";
import { signOut } from "next-auth/react";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";

export function TabTest() {
  const [is_loading,set_is_loading] = useState(false);
  const school_store = useSchoolStore();
  const base_school_store = useBaseSchoolStore();
  const section_store = useSchoolSectionStore();
  
  useEffect(()=>{

    const fetch = async () =>{
      const {data,error} = await axios_request('/api/school-settings','get',undefined,undefined,{message:'',cb:(data)=>{
        if(data){
          console.log('Get data from server ',data);
          if(data.base_school){
            base_school_store.setData(data.base_school);
          }
          if(data.school){
            school_store.setSchools(data.school);
          }

          if(data.section){
            section_store.setSchoolSections(data.section);
            //school_store.setSchools(data.school);
          }

          set_is_loading(true);
        }
      }},(error)=>{
        if(error?.cause === 401 || error?.cause === 403){
          signOut();
          return;
        }
      },true);
    }
    fetch();
  },[]);

  if(!is_loading)
  return null;

  return (
    <Tabs defaultValue="account" className="w-full p-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="account">Create User</TabsTrigger>
        <TabsTrigger value="school_naming">School Naming</TabsTrigger>
        <TabsTrigger value="school">School</TabsTrigger>
        <TabsTrigger value="section">Section</TabsTrigger>
        <TabsTrigger value="password">Upload File</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <CreateUserForm />
      </TabsContent>
      <TabsContent value="school_naming" className="flex items-center justify-center">
        {/*<CreateBaseSchoolForm base_school={base_school_store.data} />*/}
      </TabsContent>

      <TabsContent value="school" className="flex items-center justify-center">
        {/*<Schooling school_data={school_store.schools} base_data={useBaseSchoolStore.getState().data} />*/}
      </TabsContent>

      <TabsContent value="section" className="flex items-center justify-center">
        {/*<SchoolSection school_data={useSchoolSectionStore.getState().schoolSections} base_data={useBaseSchoolStore.getState().data} schooling_data={useSchoolStore.getState().schools} />*/}
      </TabsContent>

      <TabsContent value="password" className="flex items-center justify-end">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
