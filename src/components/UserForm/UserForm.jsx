import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectorGetUser } from '../../redux/user/selectors';
import { updateUserProfile } from '../../redux/user/user-operations';

import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import { infoUserSchema } from './validationUserInfo/validationUserInfo';

import css from './UserForm.module.scss';
import userAvatar from '../../images/icons/ph_user.svg';
import MyDatePicker from './DatePicker/DatePicker';
import { Notify } from 'notiflix';
import { userInfoKeys } from 'constants/userInfo.constants';
import WithTranslateFormErrors from 'hooks/useTranslateFormErrors';

const UserForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userInfo = useSelector(selectorGetUser);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  let initialUserInfo = {
    phone: userInfo.phone || '',
    telegram: userInfo.telegram || '',
    userName: userInfo.userName,
    email: userInfo.email,
    birthday: userInfo.birthday,
    avatarUpload: false,
  };

  const submiting = async values => {
    const formData = new FormData();
    userInfoKeys.forEach(key => {
      if (!values[key]) {
        return;
      }
      if (key === 'birthday') {
        const birthday = moment(values[key]).format('YYYY-MM-DD');
        formData.append('birthday', birthday);
        return;
      }
      formData.append(key, values[key]);
    });
    if (file) {
      formData.append('avatar', file);
    }
    try {
      await dispatch(updateUserProfile(formData));
      Notify.success(t('notify.Success.Info updated.'));
    } catch (error) {
      console.log(error);
      Notify.error(t('notify.Error.Something gone wrong.'));
    }
  };

  const handleAvatarChange = (e, setFieldValue) => {
    const userAvatarPreviewImg = e.target.files[0];
    setFile(userAvatarPreviewImg);
    const reader = new FileReader();
    const blob = new Blob([userAvatarPreviewImg], {
      type: userAvatarPreviewImg.type,
    });
    reader.readAsDataURL(blob);
    reader.onload = () => {
      setPreviewImageUrl(reader.result);
      setFieldValue('avatar-upload', !!userAvatarPreviewImg);
    };
  };

  return (
    <section className={`${css.user_page}`}>
      <Formik
        initialValues={initialUserInfo}
        validationSchema={infoUserSchema}
        onSubmit={submiting}
        enableReinitialize={true}
      >
        {({
          isSubmitting,
          touched,
          dirty,
          errors,
          values,
          setFieldTouched,
          setFieldValue,
        }) => (
          <WithTranslateFormErrors
            errors={errors}
            touched={touched}
            setFieldTouched={setFieldTouched}
          >
            <Form>
              <div className={`${css.user_page__avatar_container}`}>
                <img
                  className={`${css.user_page__avatar}`}
                  src={previewImageUrl || userInfo.avatar || userAvatar}
                  alt="User Avatar"
                />
                <div className={`${css.avatar_upload_container}`}>
                  <Field
                    id="avatar-upload"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={e => handleAvatarChange(e, setFieldValue)}
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`${css.avatar_upload_btn}`}
                  ></label>
                </div>
                <h3 className={`${css.user_page__name}`}>
                  {userInfo.userName || t('Username')}
                </h3>
                <p className={`${css.user_page__role}`}>{t('User')}</p>
              </div>
              <div className={`${css.username_form}`}>
                <label
                  htmlFor="userName"
                  className={`${css.username_form__label}`}
                >
                  {t('Username')}
                  <Field
                    name="userName"
                    type="text"
                    className={
                      `${css.username_form_input}` +
                      (errors.userName && touched.userName
                        ? css.is_invalid
                        : '')
                    }
                    placeholder={t('Username')}
                  />
                  {errors.userName && (
                    <div className={css.invalid_feedback}>
                      {t(`errors.${errors.userName}`)}
                    </div>
                  )}
                </label>

                <label
                  htmlFor="birthday"
                  className={`${css.username_form__label}`}
                >
                  {t('Birthday')}:
                  <MyDatePicker
                    name="birthday"
                    birthday={values.birthday}
                    className={css.my_date_picker}
                  />
                  {errors.birthday && (
                    <div className={css.invalid_feedback}>
                      {t(`errors.${errors.birthday}`)}
                    </div>
                  )}
                </label>

                <label
                  htmlFor="email"
                  className={`${css.username_form__label}`}
                >
                  {t('Email')}
                  <Field
                    name="email"
                    type="email"
                    className={`${css.username_form_input}`}
                  />
                  {errors.email && (
                    <div className={css.invalid_feedback}>
                      {t(`errors.${errors.email}`)}
                    </div>
                  )}
                </label>
                <label
                  htmlFor="phone"
                  className={`${css.username_form__label}`}
                >
                  {t('Phone')}:
                  <Field
                    className={`${css.username_form_input}`}
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder={t('Enter your phone')}
                  />
                  {errors.phone && (
                    <div className={css.invalid_feedback}>
                      {t(`errors.${errors.phone}`)}
                    </div>
                  )}
                </label>

                <label
                  htmlFor="telegram"
                  className={`${css.username_form__label}`}
                >
                  {t('Telegram')}:
                  <Field
                    className={`${css.username_form_input}`}
                    id="telegram"
                    name="telegram"
                    type="text"
                    placeholder={t('Enter your Telegram link')}
                  />
                  {errors.telegram && (
                    <div className={css.invalid_feedback}>
                      {t(`errors.${errors.telegram}`)}
                    </div>
                  )}
                </label>
                <button
                  type="submit"
                  className={`${css.username_form__submit}`}
                  disabled={isSubmitting || !touched || !dirty}
                >
                  {t('Save сhanges')}
                </button>
              </div>
            </Form>
          </WithTranslateFormErrors>
        )}
      </Formik>
    </section>
  );
};

export default UserForm;
