import * as yup from "yup";
export const signupValidationSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required(),
});
export const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
export const passwordRecoveryValidationSchema = yup.object().shape({

  currentPassword: yup.string().min(6).required(),
  newPassword: yup.string().min(6).required(),
  confirmPassword: yup.string().min(6).required(),
});
