import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required('Content is required')
    .min(20, 'Password must be at least 20 characters')
    .max(300, 'Password must not exceed 300 characters'),
});
