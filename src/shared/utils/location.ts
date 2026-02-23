import { COLOMBIA_LOCATIONS } from "../constants/colombiaLocations";
import type { SelectOption } from "../types";

export const getDepartments = (): SelectOption[] => {
  return COLOMBIA_LOCATIONS.map((location) => ({
    value: location.departamento,
    label: location.departamento,
  })).sort((a, b) => a.label.localeCompare(b.label));
};

export const getMunicipalitiesByDepartment = (
  departmentName: string
): SelectOption[] => {
  const department = COLOMBIA_LOCATIONS.find(
    (location) => location.departamento === departmentName
  );

  if (!department) {
    return [];
  }

  return department.ciudades
    .map((ciudad) => ({
      value: ciudad,
      label: ciudad,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};


export const DEPARTMENTS = getDepartments();
