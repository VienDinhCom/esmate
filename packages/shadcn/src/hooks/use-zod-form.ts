import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ZodType, z } from "zod";

export function useZodForm<TSchema extends ZodType<any, any>>(
  props: Omit<UseFormProps<z.infer<TSchema>>, "resolver"> & { schema: TSchema }
): UseFormReturn<z.infer<TSchema>> {
  const { schema, ...formProps } = props;

  return useForm({
    ...formProps,
    resolver: zodResolver(schema) as any,
  });
}

// function useTest() {
//   const form = useZodForm({
//     schema: z.object({
//       name: z.string().min(2),
//       age: z.number().min(18),
//     }),
//     defaultValues: {
//       name: "John Doe",
//       age: 18,
//     },
//   });

//   form.register("name");
// }
