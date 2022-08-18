import styles from './NavItemMobile.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavItemMobile = (props) => {
  const { text, href, icon, active } = props;
  return (
    <Link href={href}>
      <div
        className={`${styles['nav-mobile-item']} ${
          active ? `${styles['active']}` : ''
        }`}
      >
        <FontAwesomeIcon className={styles.icon} icon={icon} />
        <span>{text}</span>
      </div>
    </Link>
  );
};

export default NavItemMobile;
