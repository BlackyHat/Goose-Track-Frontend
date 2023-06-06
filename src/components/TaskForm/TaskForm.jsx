import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from 'redux/tasks/tasksOperations';
import { useTranslation } from 'react-i18next';
import { Notify } from 'notiflix';

import { PRIORITY_OPTIONS } from 'constants/priority.constans';
import { taskSchema } from './validationTasks/validationTasks';

import moment from 'moment';
import clsx from 'clsx';

import { Formik, Form, Field } from 'formik';
import CustomRadio from './CustomRadio/CustomRadio';

import styles from './TaskForm.module.scss';
import { ReactComponent as Plus } from '../../images/icons/icon-plus.svg';
import { BsPencil } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import WithTranslateFormErrors from 'hooks/useTranslateFormErrors';

export const TaskForm = ({ props, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentDay: currentDate } = useParams();

  const { taskData, column } = props;
  const initialFormikValues = taskData
    ? {
        title: taskData.title,
        startTime: taskData.startTime,
        endTime: taskData.endTime,
        taskDate: taskData.taskDate,
        priority: taskData.priority,
      }
    : {
        title: '',
        startTime: moment().format('HH:mm'),
        endTime: moment().add(1, 'hour').format('HH:mm'),
        taskDate: moment(currentDate).format('YYYY-MM-DD'),
        priority: 'low',
      };

  const submiting = async(values) => {
    if (!taskData) {
      try {
       await dispatch(addTask({ ...values, column }));
        Notify.success(t('notify.Success.Task added'));
      } catch (error) {
        Notify.error(t('notify.Error.Something gone wrong.'));
      }
    } else {
      try {
       await dispatch(
          updateTask({
            taskId: taskData._id,
            updatedTask: values,
          })
        );
        Notify.success(t('notify.Success.Task updated.'));
      } catch (error) {
        Notify.error(t('notify.Error.Something gone wrong.'));
      }
    }
    onClose();
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialFormikValues}
        validationSchema={taskSchema}
        onSubmit={submiting}
      >
        {({
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
          dirty,
          isValid,
          values,
        }) => {
          const handleStartTimeChange = event => {
            const startTime = event.target.value;
            const endTime = moment(startTime, 'HH:mm')
              .add(1, 'hour')
              .format('HH:mm');
            setFieldValue('startTime', startTime);
            setFieldValue('endTime', endTime);
          };

          return (
            <WithTranslateFormErrors
              errors={errors}
              touched={touched}
              setFieldTouched={setFieldTouched}
            >
              <Form className={clsx(styles.form)}>
                <label htmlFor="title" className={clsx(styles.title)}>
                  {t('Title')}
                  <Field
                    name="title"
                    id="title"
                    type="text"
                    placeholder={t('Enter Task')}
                    className={clsx(
                      styles.input,
                      errors.title && touched.title ? styles.isInvalid : '',
                      !errors.title && touched.title ? styles.isValid : ''
                    )}
                  />
                  {errors.title && (
                    <div className={styles.invalid_feedback}>
                      {t(`errors.${errors.title}`)}
                    </div>
                  )}
                </label>
                <div className={styles.flex}>
                  <label htmlFor="startTime" className={clsx(styles.title)}>
                    {t('taskModalMsg.start')}
                    <Field
                      name="startTime"
                      type="time"
                      onChange={handleStartTimeChange}
                      className={clsx(
                        styles.timeInput,
                        errors.startTime && touched.startTime
                          ? styles.is_invalid
                          : ''
                      )}
                    />
                    {errors.startTime && (
                      <div className={styles.invalid_startTime}>
                        {t(`errors.${errors.startTime}`)}
                      </div>
                    )}
                  </label>
                  <label htmlFor="endTime" className={clsx(styles.title)}>
                    {t('taskModalMsg.end')}
                    <Field
                      name="endTime"
                      type="time"
                      min={values.startTime || values.endTime}
                      className={clsx(
                        styles.timeInput,
                        errors.endTime && touched.endTime
                          ? styles.is_invalid
                          : ''
                      )}
                    />
                    {errors.endTime && (
                      <div className={styles.invalid_endTime}>
                        {t(`errors.${errors.endTime}`)}
                      </div>
                    )}
                  </label>
                </div>
                <div className={styles.flex}>
                  <CustomRadio
                    options={PRIORITY_OPTIONS}
                    value={values.priority}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div className={clsx(styles.submit)}>
                  {!taskData ? (
                    <>
                      <button
                        type="submit"
                        className={clsx(styles.button)}
                        disabled={!dirty || !isValid}
                      >
                        <Plus className={clsx(styles.logo)} />
                        {t('add')}
                      </button>
                      <button
                        className={clsx(styles.btn_cansel)}
                        onClick={onClose}
                      >
                        {t('Cancel')}
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className={clsx(styles.buttonEdit)}
                      disabled={!dirty || !isValid}
                    >
                      <BsPencil className={clsx(styles.logo)} />
                      {t('Edit')}
                    </button>
                  )}
                </div>
              </Form>
            </WithTranslateFormErrors>
          );
        }}
      </Formik>
    </div>
  );
};

TaskForm.propTypes = {
  props: PropTypes.shape({
    taskData: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      taskDate: PropTypes.string.isRequired,
      column: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
    }),
    column: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
