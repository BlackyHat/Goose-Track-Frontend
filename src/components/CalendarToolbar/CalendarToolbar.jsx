import moment from 'moment';
import css from './CalendarToolbar.module.scss';
import { useNavigate } from 'react-router-dom';
import {
  dayMinus,
  dayPlus,
  monthMinus,
  monthPlus,
} from 'components/utils/dateChanger';
import PeriodTypeSelect from 'components/PeriodTypeSelect/PeriodTypeSelect';
import PeriodPaginator from 'components/PeriodPaginator/PeriodPaginator';
import { useTranslation } from 'react-i18next';

const CalendarToolbar = ({ period, date }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentDate = moment(date);

  const handleNext = date => {
    if (period) {
      const prevDate = monthPlus(date);
      navigate(`/calendar/month/${prevDate}`);
    } else {
      const prevDate = dayPlus(date);
      navigate(`/calendar/day/${prevDate}`);
    }
  };

  const handlePrev = date => {
    if (period) {
      const prevDate = monthMinus(date);
      navigate(`/calendar/month/${prevDate}`);
    } else {
      const prevDate = dayMinus(date);
      navigate(`/calendar/day/${prevDate}`);
    }
  };

  const changePeriodType = type => {
    if (type === 'D') {
      navigate(`/calendar/day/${currentDate.format('YYYY-MM-DD')}`);
    }
    if (type === 'M') {
      navigate(`/calendar/month/${currentDate.format('YYYY-MM')}`);
    }
  };
  return (
    <div className={css.caledr_header_wrapper}>
      <div className={css.caledr_wrapper_month_prev_next}>
        <div className={css.caledr_month_title_wrap}>
          <span className={css.caledr_month_title}>
            {period
              ? `${t(currentDate.format('MMMM'))} ${currentDate.format('YYYY')}`
              : `${currentDate.format('D')} ${t(
                  currentDate.format('MMMM')
                )} ${currentDate.format('YYYY')}`}
          </span>
        </div>
        <PeriodPaginator
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentDate={currentDate}
        />
      </div>
      <PeriodTypeSelect
        periodTypeSelect={changePeriodType}
        period={period}
        currentDate={currentDate}
      />
    </div>
  );
};

export default CalendarToolbar;

/**
 - @PeriodPaginator - дозволяє юзеру змінити дату періоду, 
 задачі за який він хоче подивитись.
 -@PeriodTypeSelect - дозволяє юзеру змінити тип періоду, 
 задачі за який він хоче подивитись.
2. Компонент отримує тип періоду, та має локальний стейт з датою.
При зміні дати або типу періоду відбуваеться запит на отримання
 задач за обраний період, якщо задач з даного періоду досі немає в глобальному стейті.
Успіх - дані пишуться в глобальний стейт
Помилка - виводиться відповідне пуш повідомлення.
       <PeriodPaginator />
      <PeriodTypeSelect /> 

 */
