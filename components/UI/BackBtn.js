import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './BackBtn.module.css';

const BackBtn = () => {
  const router = useRouter()
    return (
        <>
          <div onClick={() => router.back()} className={styles.backBtn}><FontAwesomeIcon className='back-icon' icon={faAngleLeft} /></div>
        </>
    );
};

export default BackBtn;