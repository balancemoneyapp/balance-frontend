import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth, useUser } from '../../state/UserContext.jsx';
import styles from './User.css';
import { useOpen } from '../../hooks/useOpen.js';

export default function Menu() {
  const user = useUser();
  const { signOut } = useAuth();
  const { isOpen, handleToggle } = useOpen();

  const className = classNames(styles.User, {
    [styles.Open]: isOpen,
  });

  return (
    <div className={className}>
      {user ? (
        <>
          {user.username}
          <button onClick={handleToggle}>▾</button>
          <div className={styles.UserMenu}>
            <Link to="user" onClick={signOut}>
              Sign Out
            </Link>
          </div>
        </>
      ) : (
        <Link to="auth">Sign In</Link>
      )}
    </div>
  );
}
