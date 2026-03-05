import { Field, ErrorMessage } from "formik";
import type { JSX } from "react";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
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
        {({ field, meta }: any) => (
          <div className="relative">
            <input
              {...field}
              type={type}
              placeholder={placeholder || label}
              className={`w-full h-[48px] border-none border-b ${
                meta.touched && meta.error ? "border-red-500" : "border-gray-300"
              } outline-none text-[16px] font-sans text-[#273240] bg-transparent pb-2 placeholder-gray-400 focus:border-[#2563eb] transition-colors`}
            />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-300" />
          </div>
        )}
      </Field>
      <ErrorMessage name={name}>
        {(message) => <div className="text-red-500 text-sm mt-1 font-sans">{message}</div>}
      </ErrorMessage>
    </div>
  );
}
