import { useAuth, useAuthenticatedUser } from "@/context/AuthContext";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { UserForm } from "../components/UserForm";
import { useUpdate } from "../hooks/useUpdate";
import type { UserInput } from "../types";
import { CloseButton } from "@/shared/components/CloseButton";

export default function ProfilePage() {
  const user = useAuthenticatedUser();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { mutate: updateUser, isPending } = useUpdate({
    onSuccess: (updatedUser) => {
      // Update user in context with the latest data from the server
      setUser(updatedUser);
      toast.success("Perfil actualizado exitosamente");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error.message || "Algo salió mal, por favor intenta nuevamente"
      );
    },
  });

  const onSubmit = (data: UserInput) => {
    // Merge UserInput with existing user data (id, createdAt, updatedAt)
    const userToUpdate = {
      ...data,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    updateUser(userToUpdate);
  };

  return (
    <>
      {isPending && <Loader />}
      <div className="card-withe-transparent w-full md:max-w-[60%] mx-auto p-4 sm:p-6 md:p-10 space-y-6">
        <CloseButton redirectTo="/" className="absolute -top-5 -right-5" />
        <UserForm
          onSubmit={onSubmit}
          formId="update-profile-form"
          defaultValues={user}
        />

        <div className=" mx-auto flex justify-between gap-8">
          <Link to="/" className="btn btn-gray btn-full">
            Cancelar
          </Link>
          <button
            type="submit"
            form="update-profile-form"
            disabled={isPending}
            className="btn btn-orange btn-full"
          >
            {isPending ? "Actualizando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </>
  );
}
