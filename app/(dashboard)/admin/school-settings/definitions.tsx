import { z } from "zod";

export type BaseData = z.infer<typeof base_school_schema> | null;

export const base_school_schema = z.object({
        school_naming:z.string().nonempty({message:'Enter the conventional school name'}).trim(),
        section_naming: z.string().nonempty({message:'Enter the conventional section name'}).trim(),
        class_naming:z.string().nonempty({message:'Enter the conventional class name'}).trim(),
        arm_naming:z.string().nonempty({message:'Enter the conventional arm name'}).trim()
});