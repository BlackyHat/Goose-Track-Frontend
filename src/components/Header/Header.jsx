import { useLocation } from 'react-router-dom';
import { ReactComponent as BurgerMenuSvg } from 'images/icons/burger-menu.svg';
import css from './Header.module.scss';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import UserInfoModal from 'components/UserInfoModal/UserInfoModal';
import { useSelector } from 'react-redux';
import { selectTasks } from 'redux/tasks/taskSelectors';
import LangSwitcher from 'components/LangSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';

const Header = ({ handleBurgerMenuClick }) => {
  const { t } = useTranslation();

  const location = useLocation();
  const tasks = useSelector(selectTasks);
  let title;
  if (location.pathname === '/account') {
    title = t('navigation.My account');
  } else {
    title = t('navigation.Calendar');
  }
  return (
    <div className={css.header}>
      <BurgerMenuSvg
        className={`${css.burger}`}
        onClick={handleBurgerMenuClick}
      />
      {tasks.length === 0 ? (
        <div className={css.blockHeader}>
          <h1 className={css.title}>{title}</h1>
        </div>
      ) : (
        <div className={css.blockMessage}>
          <div className={css.img}></div>
          <div className={css.div}>
            <h1 className={css.titleTask}>{title}</h1>
            <p className={css.message}>
              <span className={css.spanMsg}>{`${t('let go')} `}</span>
              {t('focus')}
            </p>
          </div>
        </div>
      )}
      <div className={css.user}>
        <LangSwitcher />
        <ThemeToggler />
        <UserInfoModal />
      </div>
    </div>
  );
};

export default Header;
