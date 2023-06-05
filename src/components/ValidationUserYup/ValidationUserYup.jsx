import * as Yup from 'yup';

export const registerUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(36, 'Too Long!')
    .required('Required!'),
  email: Yup.string().email('Invalid email!').required('Required!'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Required!'),
});

export const loginUserSchema = Yup.object().shape({
  email: Yup.string().email('This is an ERROR email').required('Required!'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Required!'),
});
