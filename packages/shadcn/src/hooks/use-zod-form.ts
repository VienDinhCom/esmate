import { useForm, type UseFormProps, type UseFormReturn, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, infer as zodInfer } from "zod";

export type ZodFormValues<S extends ZodType<FieldValues, any, any>> = zodInfer<S>;

export interface UseZodFormProps extends Omit<UseFormProps<FieldValues>, "resolver"> {
  schema: ZodType<FieldValues, any, any>;
}

export function useZodForm(props: UseZodFormProps): UseFormReturn<FieldValues> {
  const { schema, ...formProps } = props;

  return useForm<FieldValues>({
    ...formProps,
    resolver: zodResolver(schema),
  });
}
