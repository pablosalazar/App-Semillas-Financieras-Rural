import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import GastosGame from "../components/game/GastosGame";

export default function Activity() {
  return (
    <ModulePageLayout title="Tentaciones">
      <div className="flex justify-center items-center mt-10 min-h-[60vh] w-[80%] mx-auto">
        <GastosGame />
      </div>
    </ModulePageLayout>
  );
}
