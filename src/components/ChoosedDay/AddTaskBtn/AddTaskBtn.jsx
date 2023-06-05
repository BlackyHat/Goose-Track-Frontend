import scss from './AddTaskBtn.module.scss';
import { spriteIcons } from 'images/icons';
import { useTranslation } from 'react-i18next';

const AddTaskBtn = ({ ...btnProps }) => {
  const { t } = useTranslation();

  return (
    <button type="button" className={scss.button} {...btnProps}>
      <svg className={scss.icon}>
        <use href={spriteIcons + '#icon-plus-clear'}></use>
      </svg>
      {t('Add task')}
    </button>
  );
};

export default AddTaskBtn;
