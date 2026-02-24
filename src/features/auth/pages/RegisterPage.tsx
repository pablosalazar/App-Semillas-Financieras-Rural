import type { RegisterInput } from "@/features/users/types";
import { UserAlreadyExistsError } from "@/features/users/services/user.service";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { UserForm } from "../../users/components/UserForm";
import { useRegister } from "../hooks/useRegister";
import { CloseButton } from "@/shared/components/CloseButton";

export function RegisterPage() {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useRegister({
    onSuccess: () => {
      toast.success("Usuario registrado exitosamente");
      navigate("/login");
    },
    onError: (error: Error) => {
      if (error instanceof UserAlreadyExistsError) {
        toast.warning(error.message);
      } else {
        toast.error("Algo salió mal, por favor intenta nuevamente");
      }
    },
  });

  const onSubmit = (data: RegisterInput) => {
    registerUser(data);
  };

  return (
    <div className="card-withe-transparent w-full md:max-w-[60%] mx-auto p-4 sm:p-6 md:p-10 space-y-6 my-8">
      <CloseButton redirectTo="/login" className="absolute -top-5 -right-5" />

      {isPending && <Loader />}
      <UserForm onSubmit={onSubmit} formId="register-form" isRegister />

      <div className="text-center">
        <button
          type="submit"
          form="register-form"
          disabled={isPending}
          className="btn-rustico btn-rustico-lg btn-rustico-amarillo btn-rustico-inline block mx-auto"
        >
          {isPending ? "Registrando..." : "Registrarme"}
        </button>
      </div>
    </div>
  );
}
export default RegisterPage;
