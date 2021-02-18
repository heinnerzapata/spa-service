import React from 'react';
import { V7Avatar, V7Menu, AVATAR_SIZES } from 'components';
import { LANGUAGES_OPTIONS } from 'variables/constants';
import { LANGUAGES, ILanguagesOptions } from 'models';
import flagES from 'static/media/images/flags/es.svg';
import flagGB from 'static/media/images/flags/gb.svg';
import { useTranslation } from 'react-i18next';
import styles from './v7LanguageSelector.module.scss';
import 'utilities/i18n';

interface v7LanguageSelectorProps {}

const V7LanguageSelector: React.SFC<v7LanguageSelectorProps> = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState<any>(i18n.language);

  const handleClick = (lang: string) => {
    if (typeof lang === 'string') {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
  };

  const getAvatarByLang = (lang: string) => {
    let result = flagES;

    switch (lang) {
      case LANGUAGES.EN:
        result = flagGB;
        break;
      default:
        break;
    }

    return result;
  };

  const items = LANGUAGES_OPTIONS.map(
    (item: ILanguagesOptions, index: number) => (
      <>
        <div className={styles.optionContainer}>
          <V7Avatar
            size={AVATAR_SIZES.SMALL}
            alt={`item-language-${index}`}
            src={getAvatarByLang(item.language)}
          />
          {' '}
          <span className={styles.menuItemText}>
            {t(`languages.${item.language}`)}
          </span>
        </div>
      </>
    ),
  );

  return (
    <>
      <V7Menu
        width={140}
        onItemClick={(index) => {
          handleClick(LANGUAGES_OPTIONS[index].language);
        }}
        menuImage={getAvatarByLang(language)}
        listItems={items}
      />
    </>
  );
};

export default V7LanguageSelector;
