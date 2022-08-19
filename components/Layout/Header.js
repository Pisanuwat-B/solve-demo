import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

import { useAuth } from '../../src/lib/auth-service';

import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      {user ? (
        <header className={styles.header}>
          <div className={styles['header-stats']}>
            <p className={styles.level}>{user.displayName}</p>
            <div className={styles.day}>
              <span>Rank: Diamond</span> <AddCircleIcon />
            </div>
          </div>
          <div className={styles['header-profile']}>
            <div>
              <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 60, height: 60 }} onClick={handleLogout}/>
            </div>
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
              <div className={styles.btn}>LOGIN</div>
            </Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
