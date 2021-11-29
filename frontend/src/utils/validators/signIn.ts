import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('User name is required')
    .min(6, 'User name not exceed 6 characters')
    .max(20, 'User name not exceed 20 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must not exceed 20 characters'),
});
