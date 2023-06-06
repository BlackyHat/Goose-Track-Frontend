import PropTypes from 'prop-types';
import scss from './ColumnHeadBar.module.scss';
import { spriteIcons } from 'images/icons';
import { useTranslation } from 'react-i18next';

const ColumnHeadBar = ({ title, openModalNewTask }) => {
  const { t } = useTranslation();

  return (
    <div className={scss.header}>
      <p className={scss.columnTitle}>{t(title)}</p>
      <button className={scss.iconButton} onClick={openModalNewTask}>
        <svg className={scss.icon}>
          <use href={spriteIcons + '#icon-plus-circle'}></use>
        </svg>
      </button>
    </div>
  );
};

export default ColumnHeadBar;

ColumnHeadBar.propTypes = {
  title: PropTypes.string.isRequired,
  openModalNewTask: PropTypes.func.isRequired,
};
