import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useContext } from "react";
import { Button } from "../components/button";
import { AuthContext } from "../contexts/auth";

export default function RegisterScreen() {
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
      fullName: "",
      phoneNumber: null,
    },
    onSubmit: async (state) => {
      const registerResponse = await authContext.register({
        email: state.email,
        password: state.password,
        fullName: state.fullName,
        phoneNumber: state.phoneNumber,
      });
      setSubmitting(false);
      console.log("user created")

      if (!registerResponse.success) {
        const errorCodeSplitted = registerResponse.errors.code.split("-");
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
          <Input
            id="fullName"
            name="fullName"
            type="text"
            handleChange={handleChange}
            value={values.fullName}
            error={errors.fullName}
            label="Full name"
            placeholder="firstname lastname"
          />
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            handleChange={handleChange}
            value={values.phoneNumber}
            error={errors.phoneNumber}
            label="Phone number"
            placeholder="58828919"
          />
          <Button type="submit" disabled={isSubmitting}>
            register
          </Button>
        </form>
        <Link to="/login" className="text-gray-900 font-medium text-sm">
          already have an account? <span>Login now</span>
        </Link>
      </div>
    </div>
  );
}
