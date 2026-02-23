import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";

import {
  registerSchema,
  userSchema,
} from "@/features/users/schemas/userSchema";
import { DateInput, SelectInput, TextInput } from "@/shared/components/ui";
import { DOCUMENT_TYPES, GENDER_TYPES } from "@/shared/constants";
import {
  DEPARTMENTS,
  getMunicipalitiesByDepartment,
} from "@/shared/utils/location";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RegisterInput, UserInput } from "../types";
import { Avatar } from "@/shared/components/guards/Avatar";
import { Modal } from "@/shared/components/ui/Modal";
import { DataPolicyContent } from "./DataPolicyContent";

type UserFormProps =
  | {
      isRegister: true;
      onSubmit: SubmitHandler<RegisterInput>;
      defaultValues?: Partial<UserInput>;
      formId?: string;
    }
  | {
      isRegister?: false;
      onSubmit: SubmitHandler<UserInput>;
      defaultValues?: Partial<UserInput>;
      formId?: string;
    };

export function UserForm({
  onSubmit,
  defaultValues,
  formId,
  isRegister = false,
}: UserFormProps) {
  const schema = isRegister ? registerSchema : userSchema;
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema) as unknown as Resolver<RegisterInput>,
    defaultValues,
  });

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const selectedDepartment = watch("department");
  const previousDepartmentRef = useRef<string | undefined>(selectedDepartment);

  const municipalities = useMemo(() => {
    if (!selectedDepartment) {
      return [];
    }
    return getMunicipalitiesByDepartment(selectedDepartment);
  }, [selectedDepartment]);

  useEffect(() => {
    // Only clear municipality if department actually changed (not on initial mount)
    if (
      selectedDepartment &&
      previousDepartmentRef.current !== undefined &&
      previousDepartmentRef.current !== selectedDepartment
    ) {
      setValue("municipality", "");
    }
    previousDepartmentRef.current = selectedDepartment;
  }, [selectedDepartment, setValue]);

  const gender = watch("gender");

  return (
    <form
      id={formId}
      noValidate
      onSubmit={handleSubmit(onSubmit as SubmitHandler<RegisterInput>)}
    >
      <Avatar
        gender={gender}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="Nombre(s)"
          {...register("firstname")}
          error={errors.firstname?.message}
          required
        />

        <TextInput
          label="Apellido(s)"
          {...register("lastname")}
          error={errors.lastname?.message}
          required
        />

        <SelectInput
          label="Tipo de documento"
          options={DOCUMENT_TYPES}
          {...register("documentType")}
          placeholder="Selecciona un tipo de documento"
          error={errors.documentType?.message}
          clearable
          searchable={false}
          required
        />

        <TextInput
          label="Número de documento"
          {...register("documentNumber")}
          error={errors.documentNumber?.message}
          required
        />

        <SelectInput
          label="Género"
          options={GENDER_TYPES}
          {...register("gender")}
          placeholder="Selecciona un género"
          error={errors.gender?.message}
          clearable
          searchable={false}
          required
        />

        <Controller
          control={control}
          name="birthdate"
          render={({ field, fieldState }) => (
            <div>
              <DateInput
                label="Fecha de nacimiento"
                value={field.value}
                onChange={field.onChange}
                placeholder="DD/MM/AAAA"
                error={fieldState.error?.message}
                clearable
                disabled={isSubmitting}
                minDate={
                  new Date(
                    new Date().getFullYear() - 100,
                    new Date().getMonth(),
                    new Date().getDate(),
                  )
                }
                maxDate={new Date()}
                required
              />
            </div>
          )}
        />

        <SelectInput
          label="Departamento"
          options={DEPARTMENTS}
          {...register("department")}
          placeholder="Selecciona un departamento"
          error={errors.department?.message}
          clearable
          required
        />

        <SelectInput
          label="Municipio"
          options={municipalities}
          {...register("municipality")}
          placeholder={
            selectedDepartment
              ? "Selecciona un municipio"
              : "Primero selecciona un departamento"
          }
          error={errors.municipality?.message}
          disabled={!selectedDepartment || municipalities.length === 0}
          clearable
          required
        />

        <TextInput
          label="Teléfono"
          {...register("phone")}
          error={errors.phone?.message}
          placeholder="Teléfono"
        />

        <TextInput
          label="Correo electrónico"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      {isRegister && (
        <div className="mt-6 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register("acceptDataTreatment" as keyof RegisterInput)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary cursor-pointer"
            />
            <span className="text-sm text-muted-foreground leading-snug group-hover:text-foreground transition-colors">
              Acepto el uso y tratamiento de datos personales
            </span>
          </label>
          {(
            errors as Partial<Record<keyof RegisterInput, { message?: string }>>
          ).acceptDataTreatment?.message && (
            <p className="form-error ml-7">
              {
                (
                  errors as Partial<
                    Record<keyof RegisterInput, { message?: string }>
                  >
                ).acceptDataTreatment?.message
              }
            </p>
          )}

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register("acceptPrivacyPolicy" as keyof RegisterInput)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary cursor-pointer"
            />
            <span className="text-sm text-muted-foreground leading-snug group-hover:text-foreground transition-colors">
              He leído y acepto la política de datos personales.{" "}
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(true)}
                className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors font-medium"
              >
                Conocer más
              </button>
            </span>
          </label>
          {(
            errors as Partial<Record<keyof RegisterInput, { message?: string }>>
          ).acceptPrivacyPolicy?.message && (
            <p className="form-error ml-7">
              {
                (
                  errors as Partial<
                    Record<keyof RegisterInput, { message?: string }>
                  >
                ).acceptPrivacyPolicy?.message
              }
            </p>
          )}
        </div>
      )}

      <Modal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        size="lg"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Política y autorización de datos personales
        </h2>
        <div className="text-sm text-muted-foreground space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          <DataPolicyContent />
        </div>
      </Modal>
    </form>
  );
}
