import { selectorGetUserAvatar } from 'redux/user/selectors';
import TaskToolbar from '../TaskToolbar/TaskToolbar';
import scss from './TaskColumnCard.module.scss';
import { useSelector } from 'react-redux';
import { spriteIcons } from 'images/icons';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const TaskColumnCard = ({ task }) => {
  const { title, priority, startTime, endTime } = task;
  const { t } = useTranslation();

  const avatarPath = useSelector(selectorGetUserAvatar);

  return (
    <li className={scss.card}>
      <p className={scss.title}>{title}</p>
      <p className={scss.timeText}>
        {t('From')} {startTime} {t('to')} {endTime}
      </p>
      <div className={scss.block}>
        <div className={scss.user}>
          {!avatarPath ? (
            <svg className={scss.userAvatar}>
              <use href={spriteIcons + '#icon-avatar'}></use>
            </svg>
          ) : (
            <img className={scss.userAvatar} src={avatarPath} alt="avatar" />
          )}
          <p className={clsx(scss.priority, scss[priority])}> {t(priority)} </p>
          <TaskToolbar task={task} />
        </div>
      </div>
    </li>
  );
};

export default TaskColumnCard;
