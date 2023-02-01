import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AuthForm } from './AuthForm.jsx';

describe('AuthForm', () => {
  it('submits sign up credentials to the onSignUp handler', async () => {
    const user = userEvent.setup();
    const signUp = jest.fn();

    render(
      <Router>
        <AuthForm mode="signup" onSignUp={signUp} />
      </Router>
    );

    const credentials = {
      email: 'e@mail.net',
      username: 'testy',
      password: 'sekure',
    };

    await user.type(
      screen.getByLabelText('Email'),
      credentials.email
    );

    await user.type(
      screen.getByLabelText('Username'),
      credentials.username
    );

    await user.type(
      screen.getByLabelText('Password'),
      credentials.password
    );

    await user.click(screen.getByRole('button'));

    expect(signUp).toHaveBeenCalledWith(credentials);
  });

  it('submits sign in credentials to the onSignIn handler', async () => {
    const user = userEvent.setup();
    const signIn = jest.fn();

    render(
      <Router>
        <AuthForm mode="signin" onSignIn={signIn} />
      </Router>
    );

    const credentials = {
      email: 'e@mail.net',
      password: 'sekure',
      username: '',
    };

    await user.type(
      screen.getByLabelText('Email'),
      credentials.email
    );

    await user.type(
      screen.getByLabelText('Password'),
      credentials.password
    );

    await user.click(screen.getByRole('button'));

    expect(signIn).toHaveBeenCalledWith(credentials);
  });
});
