import React, { useState } from 'react';
import './LoginForm.scss';
import { Meteor } from 'meteor/meteor';
import { useNavigate, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import {Button, useToaster} from '@gravity-ui/uikit';
import {TextInput, Text} from '@gravity-ui/uikit';

const LoginForm = () => {
  const [username, setUsername] = useState<string | undefined>('');
  const [password, setPassword] = useState<string | undefined>('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const {add} = useToaster();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    if (username && password) {
      Meteor.loginWithPassword({ username: username }, password, (err) => {
        if (err instanceof Meteor.Error) {
          err.reason === 'Incorrect password' ?
            add({
              name: 'Error!',
              title: 'Неверный пароль',
              theme: 'danger',
              autoHiding: 5000,
              isClosable: true
            }) :
            add({
              name: 'Error!',
              title: 'Пользователя с такой почтой нет',
              theme: 'danger',
              autoHiding: 5000,
              isClosable: true
            })
          setIsLoading(false)
          return
        } else {
          setIsLoading(false)
          navigate('/cabinet')
        }
      });
    }
    setIsLoading(false)
  };

  return (
    <div className='container'>
      <Text variant="display-3">Войти в систему</Text>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Form
        className='login__wrapper'
        onSubmit={handleLogin}
      >
        <TextInput
          label="Почта:"
          size="xl"
          type="email" value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextInput
          label="Пароль:"
          size="xl"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className='login__wrapper-buttons'>
          <Button size="l" view="outlined-info" type='submit' loading={isLoading}>Войти</Button>
          <Link to={'/signup'}>
            <a>Зарегистрироваться</a>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
