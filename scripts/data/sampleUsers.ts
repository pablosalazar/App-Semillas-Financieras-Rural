import type { UserInput } from "../../src/features/users/types";

// Helper function to create dates at midnight local time (not UTC)
// This prevents timezone issues when displaying birthdates
const createLocalDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day);
};

export const sampleUsers: UserInput[] = [
  {
    firstname: "Maria Elena",
    lastname: "Restrepo Tobar",
    documentType: "CC",
    documentNumber: "25394479",
    gender: "Femenino",
    birthdate: createLocalDate(1956, 8, 4),
    department: "Cauca",
    municipality: "El Tambo",
    phone: "3002923253",
    email: "maria.restrepo@gmail.com",
  },
  {
    firstname: "Alex Alberto",
    lastname: "Salazar Restrepo",
    documentType: "CC",
    documentNumber: "76326912",
    gender: "Masculino",
    birthdate: createLocalDate(1976, 10, 18),
    department: "Cauca",
    municipality: "Popayán",
    phone: "3013686827",
    email: "alex.salazar@gmail.com",
  },
  {
    firstname: "Juan Pablo",
    lastname: "Salazar Restrepo",
    documentType: "CC",
    documentNumber: "1061701570",
    gender: "Masculino",
    birthdate: createLocalDate(1987, 9, 15),
    department: "Valle del Cauca",
    municipality: "Cali",
    phone: "3105160145",
    email: "pablo.salazar@gmail.com",
  },
];
