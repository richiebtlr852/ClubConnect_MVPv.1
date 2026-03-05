import { AuthButton } from "../../components/AuthButton";
import { AuthFormFooter } from "../../components/AuthFormFooter";
import { AuthFormHeader } from "../../components/AuthFormHeader";
import { AuthLayout } from "../../components/AuthLayout";
import { FormInput } from "../../components/FormInput";
import { useSignUp } from "../../hooks";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import type { JSX } from "react";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Club name must be at least 2 characters")
    .required("Club name is required"),
  suburb: Yup.string()
    .min(2, "Suburb must be at least 2 characters")
    .required("Suburb is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface SignUpFormValues {
  name: string;
  suburb: string;
  email: string;
  password: string;
}

export function SignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { mutateAsync } = useSignUp({
    onSuccess: () => {
      void navigate("/");
    },
  });

  const handleSubmit = async (values: SignUpFormValues, { setSubmitting }: any) => {
    setError("");
    try {
      await mutateAsync(values);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
      console.error("Sign up error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[600px]">
        <AuthFormHeader title="Create a new Club Account" />

        <Formik
          initialValues={{
            name: "",
            suburb: "",
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-6">
              <FormInput name="name" label="Club Name" />
              <FormInput name="suburb" label="Suburb" />
              <FormInput name="email" label="Email" type="email" />
              <FormInput name="password" label="Password" type="password" />

              {error && <div className="text-red-500 text-sm text-center font-sans">{error}</div>}

              <div className="flex justify-center mt-6">
                <AuthButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
                </AuthButton>
              </div>

              <AuthFormFooter text="Already have an account?" linkText="Login" linkTo="/login" />
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
}
