import { useEffect, useState } from 'react';
import {
  faHouse,
  faDisplay,
  faRocket,
  faLightbulb,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

import NavItemMobile from './NavItemMobile';
import styles from './NavBar.module.css';

const MENU_LIST = [
  { text: 'Home', href: '/', icon: faHouse },
  { text: 'My Courses', href: '/my-courses', icon: faDisplay },
  { text: 'Premium', href: '/premium', icon: faRocket },
  { text: 'Analyze', href: '/analyze', icon: faLightbulb },
  { text: 'Setting', href: '/setting', icon: faBars },
];

const NavBar = () => {
  const [windowDimension, setWindowDimension] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  return (
    <>
      {isMobile ? (
        <div className={styles['nav-mobile-container']}>
          <div className={styles['nav-mobile-items-wrapper']}>
            {MENU_LIST.map((menu, index) => (
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
          <div className={styles['nav-desktop-logo']}>LOGO</div>
          <div className={styles['nav-desktop-items-wrapper']}>
            <div className={styles['nav-desktop-item']}>Home</div>
            <div className={styles['nav-desktop-item']}>Course</div>
            <div className={styles['nav-desktop-item']}>Premium</div>
            <div className={styles['nav-desktop-item']}>Analyze</div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
