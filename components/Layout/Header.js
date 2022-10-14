import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '../../src/lib/auth-service';

import styles from './Header.module.css';

const Header = () => {
  const { user, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      {user ? (
        <header className={styles.header}>
          <div className={styles['header-stats']}>
            <p className={styles.level}>{user.displayName}</p>
            <div>{role}</div>
            <div className={styles.day}>
              <span>Rank: Diamond</span> <AddCircleIcon />
            </div>
          </div>
          <div className={styles['header-profile']}>
            <Image src={user.photoURL} alt={user.displayName} width={60} height={60} onClick={handleLogout}/>
          </div>
        </header>
      ) : (
        <header className={styles.header}>
          <div className={styles['logo-container']}>
            <div className={styles.logo}>SOLVE</div>
            <div className={styles['logo-desc']}>Practice made easy</div>
          </div>
          <div className={styles['btn-container']}>
            <Link href='/signin'>
              <a>
                <div className={styles.btn}>LOGIN</div>
              </a>
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
