import { AuthButton } from "../../components/AuthButton";
import { AuthFormFooter } from "../../components/AuthFormFooter";
import { AuthFormHeader } from "../../components/AuthFormHeader";
import { AuthLayout } from "../../components/AuthLayout";
import { FormInput } from "../../components/FormInput";
import { signIn } from "../../services";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import type { FormikHelpers } from "formik";
import type { JSX } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ): Promise<void> => {
    setError("");
    try {
      await signIn({
        email: values.email,
        password: values.password,
      });
      void navigate("/");
    } catch (err: unknown) {
      const errorMessage = (err as Error).message ?? "Invalid email or password. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[600px]">
        <AuthFormHeader title="Welcome Back!" />

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }): JSX.Element => {
            return (
              <Form className="flex flex-col gap-6">
                <FormInput name="email" label="Email" type="email" />
                <FormInput name="password" label="Password" type="password" />

                {error.length > 0 && (
                  <div className="text-red-500 text-sm text-center font-sans">{error}</div>
                )}

                <div className="flex justify-center mt-6">
                  <AuthButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </AuthButton>
                </div>

                <AuthFormFooter text="Don't have an account?" linkText="Sign Up" linkTo="/signup" />
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthLayout>
  );
}
