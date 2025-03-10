'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "./ui/input"
import { Path, UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormFieldContext } from "./ui/form"
import ImageUpload from "./image-upload";

interface FormFieldComponentProps<T extends object> {
  form: UseFormReturn<T>;
  name: Path<T>; // Ensure name is a key of T
  placeholder: string | undefined;
  description?: string;
  label?: string;
}

/**
 * 

<FormField control={form.control} name="img_url" render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Background Image 
                                </FormLabel>
                                <FormControl>
                                    <ImageUpload value={field.value ? [field.value] : []} button_name="Upload an Image" onRemove={()=>field.onChange('')} disabled={loading} onChange={(url)=>field.onChange(url)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

 */


export const FormFieldComponent = <T extends object>({ form, name, placeholder, label, description }: FormFieldComponentProps<T>) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      > 
        
      </FormField>
    </FormFieldContext.Provider>
  );
};

const on_close_action = async (value:string) =>{
  console.log('URL value in on_close_action ',value);
}

export const FormFieldCloudinaryComponent = <T extends object>({ form, name, label, description }: FormFieldComponentProps<T>) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
            <ImageUpload value={field.value ? [field.value] : []} button_name="Upload an Image" onRemove={()=>field.onChange('')} onChange={(url)=>field.onChange(url)} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>} 
            <FormMessage />
          </FormItem>
        )}
      > 
        
      </FormField> 
    </FormFieldContext.Provider>
  );
};

  
interface SelectProps <T extends object>{
    name: Path<T>;
    selects: { name: string, value: string }[];
    form: UseFormReturn<T>; 
    placeholder: string | undefined;
    description?: string;
    label?: string;
}
  
  
export const FormSelectComponent = <T extends object>({ form, name, placeholder, description, label, selects }:SelectProps<T> ) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => ( // Use the render prop correctly
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  {placeholder && <SelectValue placeholder={placeholder} />}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selects.map(select => (
                  <SelectItem key={select.value} value={select.value}>
                    {select.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </FormFieldContext.Provider>
  );
};