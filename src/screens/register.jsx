import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Input from "../components/input";
import { useContext } from "react";
import { Button } from "../components/button";
import { AuthContext } from "../contexts/auth";
import { FaGithub } from "react-icons/fa";


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
      if (auth.user) return <Navigate to={`/${auth.user.uid}`} />

      

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
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-5 shrink-0">
       <FaGithub className="h-20 w-20"/>

<h1 className="text-lg"> Sign up to Github</h1>

      <div className="border border-gray-200/25 rounded-md px-2 py-6 flex-col flex items-center gap-4 bg-custom-blue  md:w-2/5 sm:w-full ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2 md:w-2/3 sm:w-5/6"
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
        <Link to="/login" className="text-gray-400 font-medium text-sm">
          <span className="text-blue-600 font-light"> already have an account? </span><span>Login now</span>
        </Link>
      </div>
    </div>
  );
}
