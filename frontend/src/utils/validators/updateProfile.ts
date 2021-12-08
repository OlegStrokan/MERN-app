import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('User name is required')
    .min(6, 'User name not exceed 6 characters')
    .max(20, 'User name not exceed 20 characters'),
  fullname: Yup.string()
    .required('Full name is required')
    .min(6, 'Full name must be at least 6 characters')
    .max(20, 'Full name must not exceed 20 characters'),
  email: Yup.string()
    .required('User name is required')
    .min(6, 'User name not exceed 6 characters')
    .max(20, 'User name not exceed 20 characters'),
});
