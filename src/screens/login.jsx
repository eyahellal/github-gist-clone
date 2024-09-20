import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Button } from "../components/button";
import { FaGithub } from "react-icons/fa";

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
   
    <div className=" sm:min w-full md:w-screen h-screen flex flex-col items-center justify-center gap-10 shrink-0 ">
      <FaGithub className="h-20 w-20"/>

    <h1 className="text-lg"> Sign in to Github</h1>

      <div className=" md:border !border-gray-300/20 rounded-md  md:w-1/5 sm:w-full py-5 px-5  flex-col flex items-center gap-10 bg-custom-blue">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2 md:w-2/3 sm:w-5/6">
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
        <Link to="/register" className="text-white font-medium text-sm">
          New to Github? <span className="text-blue-600 font-light">Create an account</span>
        </Link>
      </div>
    </div>
  );
}
