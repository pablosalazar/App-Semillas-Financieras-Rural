import { Avatar } from "@/shared/components/guards/Avatar";
import { displayName } from "@/shared/utils/user";
import type { User } from "@/features/users/types";
import { Link } from "react-router";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="relative bg-(--blue) text-white rounded-xl p-6 pt-15">
      <Avatar
        gender={user.gender}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="space-y-4 mb-4">
        <div>
          <div className="text-sm">Nombre</div>
          <div className="font-bold">{displayName(user)}</div>
        </div>
        <div>
          <div className="text-sm">Número de documento</div>
          <div className="font-bold">{user.documentNumber}</div>
        </div>
        <div>
          <div className="text-sm">Departamento</div>
          <div className="font-bold">{user.department}</div>
        </div>
        <div>
          <div className="text-sm">Municipio</div>
          <div className="font-bold">{user.municipality}</div>
        </div>
        <div>
          <div className="text-sm">Correo</div>
          <div className="font-bold">{user.email}</div>
        </div>
        <div>
          <div className="text-sm">Teléfono</div>
          <div className="font-bold">{user.phone}</div>
        </div>
      </div>
      <Link to="/profile" className="btn btn-blue btn-full">
        Editar perfil
      </Link>
    </div>
  );
}
