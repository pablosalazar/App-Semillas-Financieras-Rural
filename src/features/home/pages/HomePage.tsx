import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAssessmentContext } from "@/context";
import { ModulesSlider } from "../components/ModulesSlider";
import { Loader } from "@/shared/components/ui/loader/Loader";

export default function HomePage() {
  const navigate = useNavigate();
  const { hasPreAssessment, isLoading } = useAssessmentContext();

  useEffect(() => {
    if (!isLoading && !hasPreAssessment) {
      navigate("/evaluaciones/inicial");
    }
  }, [hasPreAssessment, isLoading, navigate]);

  return (
    <>
      {isLoading && <Loader message="Cargando..." />}

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-6xl">
          <ModulesSlider />
        </div>
      </div>
    </>
  );
}
