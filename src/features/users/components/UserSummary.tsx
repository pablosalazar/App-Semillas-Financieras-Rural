import { useAuth, useAuthenticatedUser } from "@/context/AuthContext";
import { useLearningProgressContext } from "@/context";
import { getModulesWithStatus } from "@/shared/utils/modulePath.helpers";
import { UserProfileCard } from "./UserProfileCard";
import { ModuleCard } from "./ModuleCard";
import { LogOut } from "lucide-react";

export function UserSummary() {
  const user = useAuthenticatedUser();
  const { logout } = useAuth();
  const { learningProgress } = useLearningProgressContext();

  // Get modules with their status
  const modulesWithStatus = getModulesWithStatus(learningProgress ?? null);

  return (
    <div className="flex justify-center gap-5">
      <div className="w-[400px] space-y-5">
        <UserProfileCard user={user} />

        <div className="text-center">
          <button onClick={logout} className="btn btn-outline-red">
            <LogOut />
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 px-10 flex-1">
        {modulesWithStatus.map((module) => (
          <ModuleCard
            key={module.id}
            id={module.moduleIndex + 1}
            name={module.name}
            image={module.image}
            completed={module.isCompleted}
          />
        ))}
      </div>
    </div>
  );
}
