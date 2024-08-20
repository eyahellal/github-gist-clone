import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Button } from "../components/button";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting,
    setSubmitting,
    setErrors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (state) => {
      const loginResponse = await authContext.login(state.email, state.password);
      setSubmitting(false);

      if (!loginResponse.success) {
        const errorCodeSplitted = loginResponse.errors.code.split("-");
        const errorField = errorCodeSplitted[errorCodeSplitted.length - 1];
        setErrors({
          ...errors,
          [errorField]:
            errorField === "email" ? "invalid email" : "invalid password",
        });
      }
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="border border-gray-100 rounded-sm p-5 w-2/5 flex-col flex items-center gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2 w-2/3"
        >
          <Input
            id="email"
            name="email"
            type="email"
            handleChange={handleChange}
            value={values.email}
            error={errors.email}
            label="Email address"
            placeholder="name@example.com"
          />
          <Input
            id="password"
            name="password"
            type="password"
            handleChange={handleChange}
            value={values.password}
            error={errors.password}
            label="Password"
            placeholder="123456789"
          />
          <Button type="submit" disabled={isSubmitting}>
            login
          </Button>
        </form>
        <Link to="/register" className="text-gray-900 font-medium text-sm">
          you don't have an account? <span>Register now</span>
        </Link>
      </div>
    </div>
  );
}
