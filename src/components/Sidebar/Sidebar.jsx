import Navigation from './Navigation/Navigation';
import logoImg from 'images/logoImg.png';
import { ReactComponent as Xclose } from 'images/icons/x-close.svg';
import { useTranslation } from 'react-i18next';

import gooseDesk3x from 'images/bar/desktop/goose-1-desktop-3x.png';
import gooseDesk2x from 'images/bar/desktop/goose-1-desktop-2x.png';
import gooseDesk1x from 'images/bar/desktop/goose-1-desktop-1x.png';

import css from './Sidebar.module.scss';
import clsx from 'clsx';

const Sidebar = ({ isSidebarOpen, handleBurgerMenuClick }) => {
  const { t } = useTranslation();

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleBurgerMenuClick && handleBurgerMenuClick();
    }
  };

  return (
    <>
      <div
        className={clsx(isSidebarOpen && css.overlay)}
        onClick={handleClickBackdrop}
      ></div>
      <div className={clsx(css.sidebar, isSidebarOpen && css.open)}>
        <div className={css.logo}>
          <picture>
            <source
              srcSet={`${gooseDesk1x} 1x, ${gooseDesk2x} 2x, ${gooseDesk3x} 3x`}
              alt={t('Goose')}
            />
            <img className={css.logoImg} src={logoImg} alt={t('Goose')} />
          </picture>

          <p className={css.logoText}>
            G<i>oo</i>seTrack
          </p>
          <Xclose className={css.closeIcon} onClick={handleBurgerMenuClick} />
        </div>
        <Navigation onCloseMenu={handleBurgerMenuClick} />
      </div>
    </>
  );
};

export default Sidebar;
