import styles from './header.module.scss';
import { useTranslation } from 'react-i18next';

import goose from '../assets/img/GOOSE_2.png';
import svgIcon from '../assets/img/Icon_arr.svg';
import { NavLink } from 'react-router-dom';
// Goose Retina
import gooseDesk3x from '../../../images/bar/desktop/goose-1-desktop-3x.png';
import gooseDesk2x from '../../../images/bar/desktop/goose-1-desktop-2x.png';
import gooseDesk1x from '../../../images/bar/desktop/goose-1-desktop-1x.png';

let handleDel;

export const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <picture>
          <source
            className={styles}
            srcSet={`${gooseDesk1x} 1x, ${gooseDesk2x} 2x, ${gooseDesk3x} 3x`}
            alt="Goose"
          />
          <img className={styles.logo} src={goose} alt="Goose" />
        </picture>

        <h1 className={styles.main_title}>
          G<span className={styles.oo_title}>oo</span>seTrack
        </h1>

        <div className={styles.box_btn}>
          <NavLink
            to={'/register'}
            type="button"
            className={styles.but_SignUp}
            onClick={handleDel}
          >
            {t('Sign up')}
          </NavLink>

          <NavLink
            to={'/login'}
            type="button"
            className={styles.but_LogIn}
            onClick={handleDel}
          >
            {t('Log in')}
            <img className={styles.svgIcon} src={svgIcon} alt="Icon" />
          </NavLink>

          <button
            type="button"
            className={styles.but_SignUp02}
            onClick={handleDel}
          >
            {t('Sign up')}
          </button>
        </div>
      </div>
    </div>
  );
};
