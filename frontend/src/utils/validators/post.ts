import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(300, 'Title must not exceed 30 characters'),
  content: Yup.string()
    .required('Content is required')
    .min(20, 'Password must be at least 20 characters')
    .max(300, 'Password must not exceed 300 characters'),
});
