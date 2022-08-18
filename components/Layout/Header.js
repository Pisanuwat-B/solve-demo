import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles['header-stats']}>
          <p className={styles.level}>Level 99</p>
          <div className={styles.day}>
            12 days <FontAwesomeIcon className={styles.icon} icon={faPlus} />
          </div>
        </div>
        <div className={styles['header-profile']}>
          <div className={styles['profile-wrapper']}>
            <Image src="/user.svg" alt="User Profile" width={80} height={80} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
