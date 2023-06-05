import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import classNames from 'classnames';
import scss from './DayCalendarHead.module.scss';
import { newWeek, isCurrentDay, isCurrentChosedDay } from 'components/utils';
import { useTranslation } from 'react-i18next';

const DayCalendarHead = ({ currentDay }) => {
  const chosedDay = moment(currentDay);
  const week = newWeek(chosedDay);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { t } = useTranslation();

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={classNames([scss.days_wrapper, scss.days_wrapp])}>
      {week.map((day, i) => {
        const checkDay = isCurrentChosedDay(chosedDay, day);
        const currentDay = isCurrentDay(day);
        return (
          <NavLink
            key={i}
            className={classNames([
              scss.days_wrap,
              scss.column,
              !checkDay ? scss.hover_color : [scss.back, scss.scale],
            ])}
            to={`/calendar/day/${day.format('YYYY-MM-DD')}`}
          >
            <div className={scss.days}>
              {windowSize < 768
                ? t(day.format('ddd').toUpperCase()).charAt(0)
                : t(day.format('ddd').toUpperCase())}
            </div>
            <div
              className={classNames([
                scss.date,
                !currentDay ? scss.min_scale : [scss.current_day, scss.scale],
              ])}
            >
              <span className={classNames(currentDay && scss.current_day)}>
                {day.format('D')}
              </span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
export default DayCalendarHead;
