import { Link } from 'react-router-dom';
import { useAuth } from '../../state/UserContext.jsx';
import { useAuthForm } from '../../hooks/useAuthForm.js';
import { InputControl, FormButton } from '../Forms/FormControls.jsx';
import styles from './AuthForm.css';

export default function AuthFormContainer({ mode }) {
  const auth = useAuth(mode);
  return <AuthForm {...auth} mode={mode} />;
}

export function AuthForm({ onSignIn, onSignUp, error, mode }) {
  const [credentials, handleChange] = useAuthForm({
    email: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await type.action(credentials);
  };

  const signin = {
    prompt: 'Sign into your account',
    button: 'Sign In',
    switch: {
      prompt: 'Need to create an account?',
      link: 'signup',
    },
    action: onSignIn,
  };

  const signup = {
    prompt: 'Create an account',
    button: 'Sign Up',
    switch: {
      prompt: 'Already have an account?',
      link: '../',
    },
    action: onSignUp,
  };

  const modes = { signin, signup };
  const type = modes[mode];

  return (
    <form className={styles.AuthForm} onSubmit={handleSubmit}>
      <h2>{type.prompt}</h2>

      <InputControl
        label="Email"
        name="email"
        onChange={handleChange}
        required
        type="email"
        value={credentials.email}
      />

      {type === signup && (
        <InputControl
          label="Username"
          name="username"
          onChange={handleChange}
          required
          value={credentials.username}
        />
      )}

      <InputControl
        label="Password"
        name="password"
        onChange={handleChange}
        required
        type="password"
        value={credentials.password}
      />

      <FormButton>{type.button}</FormButton>

      <p className="error">{error}</p>

      <nav>
        <Link to={type.switch.link}>{type.switch.prompt}</Link>
      </nav>
    </form>
  );
}
