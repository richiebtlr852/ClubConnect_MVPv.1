import { Field, ErrorMessage } from "formik";
import type { FieldInputProps, FieldMetaProps } from "formik";
import type { JSX } from "react";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface FieldRenderProps {
  field: FieldInputProps<string>;
  meta: FieldMetaProps<string>;
}

export function FormInput({
  name,
  label,
  type = "text",
  placeholder,
}: FormInputProps): JSX.Element {
  return (
    <div className="w-full">
      <Field name={name}>
        {({ field, meta }: FieldRenderProps): JSX.Element => {
          const hasError = meta.touched === true && typeof meta.error === "string";
          const borderColor = hasError ? "border-red-500" : "border-gray-300";
          const placeholderText = placeholder ?? label;

          return (
            <div className="relative">
              <input
                {...field}
                type={type}
                placeholder={placeholderText}
                className={`w-full h-[48px] border-none border-b ${borderColor} outline-none text-[16px] font-sans text-[#273240] bg-transparent pb-2 placeholder-gray-400 focus:border-[#2563eb] transition-colors`}
              />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-300" />
            </div>
          );
        }}
      </Field>
      <ErrorMessage name={name}>
        {(message): JSX.Element => {
          return <div className="text-red-500 text-sm mt-1 font-sans">{message}</div>;
        }}
      </ErrorMessage>
    </div>
  );
}
