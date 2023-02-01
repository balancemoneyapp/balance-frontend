import Navigation from './Navigation.jsx';
import styles from './SlideoutMenu.css';
import classnames from 'classnames';
import { useOpen } from '../../hooks/useOpen.js';

export default function SlideoutMenu({ navigation }) {
  const { isOpen, handleToggle } = useOpen();

  const className = classnames(styles.SlideoutMenu, {
    [styles.Open]: isOpen,
  });

  return (
    <button className={className} onClick={handleToggle}>
      <div className={styles.MenuContainer}>
        <Navigation navigation={navigation} />
      </div>
    </button>
  );
}
