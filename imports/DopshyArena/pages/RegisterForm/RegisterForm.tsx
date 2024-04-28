import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Formik, ErrorMessage, Field, FieldProps, FormikConfig } from 'formik';
import MaskedInput, { Mask } from 'react-text-mask'
import { schema } from './schema';

import './RegisterForm.scss';

const RegisterForm = () => {
    const navigate = useNavigate();

    const handleRegister = (form: any) => {
        Meteor.call('users.insert', form, (error: Error) => {
            if (error) {
                console.log(error.message);
            } else {
                Meteor.loginWithPassword(
                    { username: form.email },
                    form.password,
                    (err) => {
                        if (err) console.log(err);
                        navigate('/field')
                    },
                );
            }
        });
    };

    const phoneNumberMask: Mask = [
        '+',
        '7',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
    ];

    return (
        <div className='container'>
            <div>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleRegister}
                    initialValues={{
                        name: '',
                        surname: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: '',
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form className='register__wrapper' noValidate onSubmit={handleSubmit}>
                            <Form.Label>
                                Имя:
                                <Form.Control
                                    type="text"
                                    name='name'
                                    placeholder='Имя'
                                    value={values.name}
                                    onChange={handleChange}
                                    isValid={touched.name && !errors.name}
                                    isInvalid={!!errors.name}
                                />
                                <span className='error-message'>
                                    <ErrorMessage name='name' />
                                </span>
                            </Form.Label>
                            <Form.Label>
                                Фамилия:
                                <Form.Control
                                    type="text"
                                    name='surname'
                                    placeholder='Фамилия'
                                    value={values.surname}
                                    onChange={handleChange}
                                    isValid={touched.surname && !errors.surname}
                                    isInvalid={!!errors.surname}
                                />
                                <span className='error-message'>
                                    <ErrorMessage name='surname' />
                                </span>
                            </Form.Label>
                            <Form.Label>Email:</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id='inputGroupPrepend'>
                                    @
                                </InputGroup.Text>
                                <Form.Control
                                    type='email'
                                    placeholder={'Email'}
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={!!errors.email}
                                />
                            </InputGroup>
                            <span className='error-message'>
                                <ErrorMessage name='email' />
                            </span>
                            <Form.Label>Номер телефона:</Form.Label>
                            <Field name='phone'>
                                {({ field }: FieldProps) => (
                                    <MaskedInput
                                        {...field}
                                        value={values.phone}
                                        type='text'
                                        mask={phoneNumberMask}
                                        placeholder={'Номер телефона'}
                                        onChange={handleChange}
                                        className='input-mask'
                                    />
                                )}
                            </Field>
                            <span className='error-message'>
                                <ErrorMessage name='phone' />
                            </span>
                            <Form.Label>Пароль:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type='password'
                                    placeholder={'Пароль'}
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    isValid={touched.password && !errors.password}
                                    isInvalid={!!errors.password}
                                />
                            </InputGroup>
                            <span className='error-message'>
                                <ErrorMessage name='password' />
                            </span>
                            <Form.Label>Подтвердите пароль:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type='password'
                                    placeholder={'Подтвердите пароль' as string}
                                    name='confirmPassword'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    isValid={
                                        touched.confirmPassword && !errors.confirmPassword
                                    }
                                    isInvalid={!!errors.confirmPassword}
                                />
                            </InputGroup>
                            <span className='error-message'>
                                <ErrorMessage name='confirmPassword' />
                            </span>
                            <div className='register__wrapper-buttons'>
                                <Button variant='primary' type='submit' size='lg'>
                                    Зарегистрироваться
                                </Button>
                            </div>
                        </Form>
                    )}

                </Formik>

            </div>
        </div>
    );
};

export default RegisterForm;
