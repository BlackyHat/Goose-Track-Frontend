import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import { ReactComponent as LoginOutSvg } from 'images/icons/log-out.svg';
import { BsListStars, BsCalendar4 } from 'react-icons/bs';
import { FiUserCheck } from 'react-icons/fi';
import { useToggle } from 'hooks/useToggle';
import css from './Navigation.module.scss';
import Modal from 'components/Modal/Modal';
import Logout from 'components/Logout/Logout';

const Navigation = ({ onCloseMenu }) => {
  const { t } = useTranslation();

  const { isOpen, onOpen, onClose } = useToggle();

  const closeMobileMenu = () => {
    onCloseMenu && onCloseMenu();
  };
  const onLogout = () => {
    onOpen();
    onCloseMenu && onCloseMenu();
  };

  return (
    <div className={css.container}>
      <div className={css.userPanel}>
        <p className={css.navLabel}>{t('User Panel')}</p>
        <NavLink
          to="/account"
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            isActive ? css.activeLink : css.navLink
          }
        >
          <FiUserCheck />
          {t('navigation.My account')}
        </NavLink>
        <NavLink
          onClick={closeMobileMenu}
          to={`/calendar`}
          className={({ isActive }) =>
            isActive ? css.activeLink : css.navLink
          }
        >
          <BsCalendar4 />
          {t('navigation.Calendar')}
        </NavLink>
        <NavLink
          onClick={closeMobileMenu}
          to="/canban"
          className={({ isActive }) =>
            isActive ? css.activeLink : css.navLink
          }
        >
          <BsListStars />
          {t('navigation.Canban')}
        </NavLink>
      </div>
      <button onClick={onLogout} className={classNames(css.button)}>
        {t('Log out')}
        <LoginOutSvg />
      </button>
      {isOpen && (
        <Modal onClose={onClose}>
          <Logout onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};

export default Navigation;
