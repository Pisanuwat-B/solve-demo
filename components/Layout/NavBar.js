import { useEffect, useState } from 'react';
import {
  faHouse,
  faDisplay,
  faBell,
  faLightbulb,
  faBars,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '../../src/lib/auth-service';
import NavItemMobile from './NavItemMobile';
import styles from './NavBar.module.css';

const STUDENT_MENU_LIST = [
  { text: 'Home', href: '/', icon: faHouse },
  { text: 'My Courses', href: '/my-courses', icon: faDisplay },
  { text: 'Notification', href: '/notification', icon: faBell },
  { text: 'Analyze', href: '/analyze', icon: faLightbulb },
  { text: 'Setting', href: '/setting', icon: faBars },
];

const TUTOR_MENU_LIST = [
  { text: 'Home', href: '/', icon: faHouse },
  { text: 'My Answer', href: '/my-answers', icon: faMessage },
  { text: 'Notification', href: '/notification', icon: faBell },
  { text: 'Analyze', href: '/analyze', icon: faLightbulb },
  { text: 'Setting', href: '/setting', icon: faBars },
];

const NavBar = (props) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const { role } = useAuth();
  const router = useRouter();
  const activeList = role == 'student' ? STUDENT_MENU_LIST : TUTOR_MENU_LIST;

  useEffect(() => {
    switch (router.pathname) {
      case '/my-courses':
        setActiveIdx(1);
        break;
      case '/notification':
        setActiveIdx(2);
        break;
      case '/analyze':
        setActiveIdx(3);
        break;
      case '/setting':
        setActiveIdx(4);
        break;
    }
  }, []);

  return (
    <>
      {props.isMobile ? (
        <div className={styles['nav-mobile-container']}>
          <div className={styles['nav-mobile-items-wrapper']}>
            {activeList.map((menu, index) => (
              <div
                onClick={() => {
                  setActiveIdx(index);
                }}
                key={menu.text}
              >
                <NavItemMobile active={activeIdx === index} {...menu} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles['nav-desktop-container']}>
          <Link href={'/'}>
            <Image className={styles['nav-desktop-logo']} src={'/logo.png'} alt="Placeholder" width={60} height={60} />
          </Link>
          <div className={styles['nav-desktop-items-wrapper']}>
            {activeList.map((menu, index) => (
              <Link href={menu.href} key={index}>
                <div className={styles['nav-desktop-item']}>{menu.text}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
