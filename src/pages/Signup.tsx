import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "../lib/validationSchema";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../zustand/userStore";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupValidationSchema),
  });
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const REGISTER_MUTATION = gql`
    mutation ($input: RegisterUserInput!) {
      register(input: $input) {
        user {
          username
          email
        }
      }
    }
  `;
  const [registerUser, { loading: updateLoading, data: userData }] =
    useMutation(REGISTER_MUTATION);
  const onSubmit = (data: FormData) => {
    registerUser({
      variables: {
        input: {
          email: data.email,
          password: data.password,
          username: data.username,
        },
      },
      onError(error) {
        toast(error.message, { type: "error" });
      },
      onCompleted({ register: { user } }) {
        const { email, username } = user;
        toast("Registration Succesfull", { type: "success" });
        setUser({
          username,
          email,
        });
        // if (data.register.user.username) navigate("/app");
      },
    });
  };

  return (
    <div className="w-full max-w-xs">
      {/* {data && data.user.username} */}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* {errors.password && <span>{errors.password.message}</span>}
        {errors.email && <span>{errors.email.message}</span>}

        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )} */}
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          {/* border-red-500 */}
          <input
            className={`shadow ${
              errors.email && "border-red-500"
            }   appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            placeholder="example@example.com"
            {...register("email")}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          {/* border-red-500 */}
          <input
            className="shadow   appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="******"
            {...register("password")}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          {/* border-red-500 */}
          <input
            className="shadow   appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="******"
            {...register("confirmPassword")}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
        </div>
        <div className="flex items-center justify-between mb-8">
          <button
            className="bg-blue-500 flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="flex items-center justify-between flex-row-reverse">
          <button
            className=" whitespace-nowrap text-blue-400 hover:text-blue-600 text-xs    rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <Link to="/">Log in</Link>
          </button>
          <p className="inline-block align-baseline  text-xs text-gray-500 opacity-30">
            Already have an account?
          </p>
        </div>
      </form>
    </div>
  );
};

// <form onSubmit={handleSubmit(onSubmit)}>
// <label htmlFor="email">Email</label>
// <input type="email" {...register("email")} />
// {errors.email && <span>{errors.email.message}</span>}

// <label htmlFor="password">Password</label>
// <input type="password" {...register("password")} />
// {errors.password && <span>{errors.password.message}</span>}

// <label htmlFor="confirmPassword">Confirm Password</label>
// <input type="password" {...register("confirmPassword")} />
// {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

// <button type="submit">Sign up</button>
// </form>
