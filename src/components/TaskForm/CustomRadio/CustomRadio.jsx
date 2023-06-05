import styles from './CustomRadio.module.scss';
import { useTranslation } from 'react-i18next';

const CustomRadio = ({ options, value, setFieldValue }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.radioGroup}`}>
      {options.map((option, index) => (
        <label
          className={`${styles.radioLabel}  ${
            value === option.value ? styles.activeRadioInput : ''
          }`}
          key={index}
        >
          <input
            className={`${styles.radioInput}`}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={() => setFieldValue('priority', option.value)}
          />
          <span
            className={`${styles.radioButton} ${
              value === option.value ? styles.active : ''
            } ${styles[option.color]}`}
          />
          {t(option.label)}
        </label>
      ))}
    </div>
  );
};

export default CustomRadio;
