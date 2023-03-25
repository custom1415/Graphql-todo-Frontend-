import { yupResolver } from "@hookform/resolvers/yup";
import { passwordRecoveryValidationSchema } from "../lib/validationSchema";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

type FormData = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(passwordRecoveryValidationSchema),
  });

  //   const LOGIN_MUTATION = gql`
  //     mutation ($input: LoginUserInput!) {
  //       login(input: $input) {
  //         user {
  //           username
  //           email
  //         }
  //       }
  //     }
  //   `;
  //   const [loginUser, { loading: updateLoading, data: userData }] =
  //     useMutation(LOGIN_MUTATION);
  const onSubmit = (data: FormData) => {
    //   loginUser({
    //     variables: {
    //       input: {
    //         email: data.email,
    //         password: data.password,
    //       },
    //     },
    //   });
    //   console.log(userData);
  };

  return (
    <div className="w-full max-w-xs">
      {/* {data && data.user.username} */}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <h1 className="mb-8 text-gray-900 text-center text-2xl">Login</h1> */}
        {/* {errors.password && <span>{errors.password.message}</span>}
        {errors.email && <span>{errors.email.message}</span>}

        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )} */}

        <div>
          <label
            className="block text-gray-500 text-sm font-bold mb-2"
            htmlFor="current password"
          >
            Current Password
          </label>
          {/* border-red-500 */}
          <input
            className={`shadow ${
              errors.password && "border-red-500"
            }   appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="current password"
            placeholder="******"
            {...register("password")}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
        </div>
        <div>
          <label
            className="block text-gray-500 text-sm font-bold mb-2"
            htmlFor="new passwod"
          >
            New Password
          </label>
          {/* border-red-500 */}
          <input
            className={`shadow    appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="new password"
            placeholder="******"
            {...register("newPassword")}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
        </div>
        <div>
          <label
            className="block text-gray-500 text-sm font-bold mb-2"
            htmlFor="confirm password"
          >
            Confirm Password
          </label>
          {/* border-red-500 */}
          <input
            className={`shadow ${
              errors.confirmPassword && "border-red-500"
            }   appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="confirm password"
            placeholder="******"
            {...register("confirmPassword")}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
        </div>

        <div className="flex items-center justify-between mt-2 mb-8  ">
          <button
            className="bg-blue-500 flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Confirm
          </button>
        </div>
        <div className="flex items-center justify-between flex-row-reverse">
          <button
            className=" whitespace-nowrap text-blue-400 hover:text-blue-600 text-xs    rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <Link to="/login">Login</Link>
          </button>
          <p className="inline-block align-baseline  text-xs text-gray-500 opacity-30">
            Want to login instead?
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
