import { TextInput } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginInput } from "../schemas/loginSchema";

interface LoginFormProps {
  onSubmit: SubmitHandler<LoginInput>;
  formId?: string;
}

export function LoginForm({ onSubmit, formId }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    // defaultValues: {
    //   documentNumber: "1061701570",
    // },
  });

  return (
    <form id={formId} noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("documentNumber")}
        error={errors.documentNumber?.message}
        className="px-4 py-3 text-lg"
        required
      />
    </form>
  );
}
