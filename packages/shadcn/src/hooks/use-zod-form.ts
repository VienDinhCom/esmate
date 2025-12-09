import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, type ZodType } from "zod";

/**
 * A custom hook that wraps useForm and automatically
 * applies the zodResolver using the provided Zod schema.
 *
 * @param {object} props - The form properties, including the Zod schema.
 * @param {ZodType<TFieldValues>} props.schema - The Zod schema defining the form fields.
 * @param {UseFormProps<TFieldValues>} [props.formProps] - Optional standard react-hook-form UseFormProps.
 * @returns {UseFormReturn<TFieldValues>} The result of useForm.
 */
export const useZodForm = <TFieldValues extends z.AnyZodObject>(
  props: {
    schema: TFieldValues;
  } & UseFormProps<z.infer<TFieldValues>>
): UseFormReturn<z.infer<TFieldValues>> => {
  type FormData = z.infer<TFieldValues>;

  // Destructure the schema and spread the rest of the standard useForm props
  const { schema, ...formProps } = props;

  return useForm<FormData>({
    ...formProps,
    // Add the zodResolver using the provided schema
    resolver: zodResolver(schema) as any,
  });
};
