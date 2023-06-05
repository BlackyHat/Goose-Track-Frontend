import scss from './PeriodTypeSelect.module.scss';
import { useTranslation } from 'react-i18next';

const PeriodTypeSelect = ({ periodTypeSelect, period }) => {
  const { t } = useTranslation();

  return (
    <div className={scss.caledr_header_wrapper_btn}>
      <button
        type="button"
        disabled={period}
        className={`${scss.btn} ${scss.month_day} ${scss.month}
                ${period && scss.active}`}
        onClick={() => periodTypeSelect('M')}
      >
        {t('Month')}
      </button>

      <button
        type="button"
        disabled={!period}
        className={`${scss.btn} 
                        ${scss.month_day} ${scss.next} ${scss.day}
                        ${!period && scss.active}`}
        onClick={() => periodTypeSelect('D')}
      >
        {t('Day')}
      </button>
    </div>
  );
};

export default PeriodTypeSelect;
