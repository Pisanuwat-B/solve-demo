import { useRouter } from 'next/router';
import { useAuth } from '../src/lib/auth-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faApple,
  faFacebookF,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Signin.module.css';

const Signin = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  
  if (user) {
    router.push(router.query.next || '/');
  }

  return (
    <div className={styles['signin-page']}>
      <div className={styles['signin-header']}>SOLVE</div>
      <div className={styles['signin-options']}>
        <button className={styles.apple}>
          <FontAwesomeIcon className={styles.icon} icon={faApple} />
          Join using Apple
        </button>
        <button className={styles.facebook}>
          <FontAwesomeIcon className={styles.icon} icon={faFacebookF} />
          Join using Facebook
        </button>
        <button className={styles.google} onClick={() => login()}>
          <FontAwesomeIcon className={styles.icon} icon={faGoogle} />
          Join using Google
        </button>
        <div className={styles['signin-separater']}>or</div>
        <button className={styles.email}>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          Join using Email
        </button>
      </div>
    </div>
  );
};

export default Signin;
