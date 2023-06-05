import { useDispatch } from 'react-redux';
import { authLogoutThunk } from 'redux/user/user-operations';
import { Link } from 'react-router-dom';
import scss from './Logout.module.scss';
import { useTranslation } from 'react-i18next';

const Logout = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(authLogoutThunk());
  };

  return (
    <>
      <h2 className={scss.buttonMeta}>{t('Are you sure to logout?')}</h2>
      <ul className={scss.buttonBox}>
        <li>
          <Link to={`/welcome`} className={scss.button} onClick={handleLogout}>
            {t('Log out')}
          </Link>
        </li>
        <li>
          <button className={scss.button} onClick={onClose}>
            {t('Canсel')}
          </button>
        </li>
      </ul>
    </>
  );
};

export default Logout;
