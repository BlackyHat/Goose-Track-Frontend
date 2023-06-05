import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUserSchema } from 'components/ValidationUserYup/ValidationUserYup';
import scss from './RegisterForm.module.scss';
import { FiLogIn } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { authRegisterThunk } from '../../redux/user/user-operations';
import { BsEyeSlashFill } from 'react-icons/bs';
import { BsEyeFill } from 'react-icons/bs';
import { useState } from 'react';
import ThemeToggler from 'components/ThemeToggler/ThemeToggler';
import { useTranslation } from 'react-i18next';
import LangSwitcher from 'components/LangSwitcher/LangSwitcher';

const initialState = {
  name: '',
  email: '',
  password: '',
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<BsEyeSlashFill />);

  const handleShowPassword = () => {
    if (type === 'password') {
      setIcon(<BsEyeFill />);
      setType('text');
    } else {
      setIcon(<BsEyeSlashFill />);
      setType('password');
    }
  };

  const handleSubmit = async (
    { name: userName, email, password },
    { resetForm }
  ) => {
    dispatch(authRegisterThunk({ userName, email, password }));
    resetForm();
  };

  return (
    <>
      <div className={scss.container}>
        <div className={scss.bgimages}></div>
        <div className={scss.bgImagesMsg}>
          <p className={scss.bgImagesText}>
            {t('Quickly')} <span className={scss.span}>{t('register')} </span>
            {t('and familiarize yourself with the application!')}
          </p>
        </div>
        <Formik
          const
          initialValues={initialState}
          validationSchema={registerUserSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form autoComplete="off" className={scss.form}>
              <div className={scss.titleWrapper}>
                <h1 className={scss.title}>{t('Register')}</h1>
                <div className={scss.togglersContainer}>
                  <LangSwitcher />
                  <ThemeToggler />
                </div>
              </div>
              <label
                className={
                  errors.name && touched.name
                    ? scss.isInvalidLabel
                    : touched.name
                    ? scss.isValidLabel
                    : scss.label
                }
              >
                <p className={scss.labelText}>{t('Username')}</p>
                <Field
                  id="name"
                  name="name"
                  type="name"
                  placeholder={t('Enter your name')}
                  className={
                    errors.name && touched.name
                      ? scss.isInvalid
                      : touched.name
                      ? scss.isValid
                      : scss.input
                  }
                />
                <div className={scss.feedback}>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={scss.invalidFeedback}
                  ></ErrorMessage>
                </div>
              </label>
              <label
                className={
                  errors.email && touched.email
                    ? scss.isInvalidLabel
                    : touched.email
                    ? scss.isValidLabel
                    : scss.label
                }
              >
                <p className={scss.labelText}>{t('Email')}</p>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('Enter email')}
                  className={
                    errors.email && touched.email
                      ? scss.isInvalid
                      : touched.email
                      ? scss.isValid
                      : scss.input
                  }
                />
                <div className={scss.feedback}>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={scss.invalidFeedback}
                  ></ErrorMessage>
                </div>
              </label>
              <label
                className={
                  errors.password && touched.password
                    ? scss.isInvalidLabel
                    : touched.password
                    ? scss.isValidLabel
                    : scss.label
                }
              >
                <p className={scss.labelText}>{t('Password')}</p>
                <Field
                  id="password"
                  name="password"
                  type={type}
                  placeholder={t('Enter your password')}
                  className={
                    errors.password && touched.password
                      ? scss.isInvalid
                      : touched.password
                      ? scss.isValid
                      : scss.input
                  }
                />
                <button
                  className={scss.btnToggle}
                  type="button"
                  onClick={handleShowPassword}
                >
                  <div className={scss.spanIcon}>{icon}</div>
                </button>
                <div className={scss.feedback}>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={scss.invalidFeedback}
                  ></ErrorMessage>
                </div>
              </label>
              <button className={scss.button} type="submit">
                {t('Registration')}
                <FiLogIn className={scss.icon} />
              </button>
            </Form>
          )}
        </Formik>
        <Link className={scss.link} to="/login">
          {t('Log In')}
        </Link>
      </div>
    </>
  );
};
