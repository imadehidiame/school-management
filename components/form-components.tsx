'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "./ui/input"
import { ControllerRenderProps, FormState, UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormFieldContext } from "./ui/form"


export const FormFieldComponent = ({ form, name, placeholder, label, description }: { form: UseFormReturn<any | undefined>, name: string, placeholder: string | undefined, description?: string, label?: string }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <FormField
        control={form.control}
        name={name}
        render={({ field, formState }) => (
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

  
  
  
export const FormSelectComponent = ({ form, name, placeholder, description, label, selects }: { form: UseFormReturn<any | undefined>, name: string, placeholder: string | undefined, description?: string, label?: string, selects: { name: string, value: string }[] }) => {
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