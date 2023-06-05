import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'hooks/useToggle';

import Modal from 'components/Modal/Modal';
import scss from './LangSwitcher.module.scss';
import { ReactComponent as UaIcon } from './country-icons/ua.svg';
import { ReactComponent as GbIcon } from './country-icons/gb.svg';
import { ReactComponent as ItIcon } from './country-icons/it.svg';
import { ReactComponent as PlIcon } from './country-icons/pl.svg';
import { langsToTraslate } from 'constants/langs';

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const { isOpen, onClose, onOpen } = useToggle();
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const lang = i18n.language;
  const openPopup = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({ top: rect.top + 13, left: rect.left - 44 });
    onOpen();
  };

  const changeLang = language => {
    i18n.changeLanguage(language);
    onClose();
  };

  const handleLangButton = choosedLang => {
    switch (choosedLang) {
      case 'ua':
        return <UaIcon className={scss.langIcon} />;
      case 'it':
        return <ItIcon className={scss.langIcon} />;
      case 'en':
        return <GbIcon className={scss.langIcon} />;
      case 'pl':
        return <PlIcon className={scss.langIcon} />;

      default:
        <GbIcon className={scss.langIcon} />;
    }
  };

  return (
    <div>
      {isOpen ? (
        <Modal
          onClose={onClose}
          notStyled={true}
          noBg={true}
          position={popupPosition}
        >
          <ul className={scss.langBox}>
            {langsToTraslate.map(language => (
              <li key={language}>
                <button
                  type="button"
                  title={language}
                  className={scss.iconInner}
                  onClick={() => changeLang(language)}
                >
                  {handleLangButton(language)}
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      ) : (
        <button
          type="button"
          className={scss.iconInner}
          title={lang}
          onClick={openPopup}
        >
          {handleLangButton(lang)}
        </button>
      )}
    </div>
  );
};

export default LangSwitcher;
