import { useAuth } from "@/context";
import type { User } from "@/features/users/types";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";
import type { LoginInput } from "../schemas";

import FMMLogo from "@/assets/images/logo.png";
import welcomeImage from "@/assets/images/wellcome-header.png";

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { mutate: loginUser, isPending } = useLogin({
    onSuccess: (user: User) => {
      setUser(user);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(
        error.message || "Algo salió mal, por favor intenta nuevamente",
      );
    },
  });

  const onSubmit = (data: LoginInput) => {
    loginUser(data);
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      {isPending && <Loader />}
      <img src={FMMLogo} alt="FMM Logo" className="mx-auto h-24" />
      <div className="card-withe-transparent max-w-md mx-auto p-10 space-y-6">
        <img src={welcomeImage} alt="Welcome" className="max-w-70 mx-auto" />

        <div>
          <LoginForm onSubmit={onSubmit} formId="login-form" />
          <div className="text-blue font-semibold text-center">
            Ingresa con tu número de identificación
          </div>
        </div>

        <button
          type="submit"
          form="login-form"
          disabled={isPending}
          className="btn-rustico btn-rustico-lg btn-rustico-amarillo"
        >
          {isPending ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
      <div className="text-center space-y-4">
        <p className="text-blue font-semibold">¿Aun no tienes cuenta?</p>
        <Link to="/register" className="btn-rustico btn-rustico-lg btn-rustico-azul btn-rustico-inline inline-block">
          Registrarme
        </Link>
      </div>
    </div>
  );
}
export default LoginPage;
