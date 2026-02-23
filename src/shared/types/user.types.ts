import type { DOCUMENT_TYPES_VALUES, GENDER_TYPES_VALUES } from "../constants";

type DocumentType = (typeof DOCUMENT_TYPES_VALUES)[number];

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  documentType: DocumentType;
  documentNumber: string;
  gender: (typeof GENDER_TYPES_VALUES)[number];
  birthdate: Date;
  department: string;
  municipality: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
