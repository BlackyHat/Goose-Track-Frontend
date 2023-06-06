import { Link } from 'react-router-dom';
import scss from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const { t } = useTranslation();

  return (
    <section className={scss.pageBox}>
      <div className={scss.wrapper}>
        <h1 className={`${scss.sectionTitle}`}>404</h1>
      </div>

      <div className={scss.infoInner}>
        <h2 className={scss.infoTitle}>{t("404.Look like you're lost")}</h2>
        <p className={scss.infoMeta}>
          {t("404.the page you are looking for not avaible!")}
        </p>
        <Link to="/calendar" className={scss.returnButton}>
          {t("404.Go to Home")}
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
