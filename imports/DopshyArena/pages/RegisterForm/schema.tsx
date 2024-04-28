import * as yup from 'yup';

export const schema = yup.object().shape({
    name: yup.string().required('Имя обязательно' || undefined),
    surname: yup.string().required('Фамилия обязательна' || undefined),
    email: yup
        .string()
        .email('Некорректный адрес электронной почты' || undefined)
        .required('Почта обязательна' || undefined),
    password: yup
        .string()
        .required('Пароль обязателен' || undefined)
        .min(8, 'Пароль должен содержать не менее 8 символов' || undefined)
        .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы' || undefined),
    phone: yup.string().required('Номер телефона обязателен' || undefined),
    confirmPassword: yup
        .string()
        .required('Подтвердите пароль' || undefined)
        .min(8, 'Пароль должен содержать не менее 8 символов' || undefined)
        .oneOf([yup.ref('password')], 'Пароль не совпадает' || undefined)
        .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы' || undefined),
});