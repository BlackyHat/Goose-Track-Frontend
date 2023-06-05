import UserAvatar from '../UserAvatar/UserAvatar';
import scss from './UserPopup.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as UserCheckSvg } from '../../../images/icons/user-check-01.svg';
import { ReactComponent as LoginOutSvg } from '../../../images/icons/log-out.svg';
import { useTranslation } from 'react-i18next';

const UserPopup = ({ userName, onClose, handleLogout }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={scss.container}>
        <div className={scss.user}>
          <UserAvatar />
          <p className={scss.userName}>{userName}</p>
        </div>
        <Link className={scss.account} to="/account" onClick={onClose}>
          <UserCheckSvg />
          {t('navigation.My account')}
        </Link>
        <button className={scss.logOut} onClick={handleLogout}>
          {t('Log out')}
          <LoginOutSvg />
        </button>
      </div>
    </>
  );
};

export default UserPopup;
