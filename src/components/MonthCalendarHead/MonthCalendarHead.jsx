import { useEffect, useState } from 'react';
import classNames from 'classnames';
import scss from './MonthCalendarHead.module.scss';
import { daysOfWeek } from 'constants/daysOfWeek';
import { useTranslation } from 'react-i18next';

const MonthCalendarHead = () => {
  const { t } = useTranslation();

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={scss.days_wrapper}>
      {daysOfWeek.map((dayOfWeek, i) => (
        <div key={i} className={scss.days_wrap}>
          <div className={classNames([scss.days, i > 4 && scss.weekend])}>
            {windowSize < 768 ? t(dayOfWeek)[0] : t(dayOfWeek)}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MonthCalendarHead;
